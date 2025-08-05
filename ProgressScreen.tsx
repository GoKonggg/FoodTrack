import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ReferenceLine 
} from 'recharts';

// Type definitions
interface ProgressScreenProps {
  onNavigate: (screen: string) => void;
  userData: {
    weight?: number;
    goalWeight?: number;
  };
  updateUserData: (data: any) => void;
}

interface WeightEntry {
  date: string;
  weight: number;
}

interface UpdateValueModalProps {
  title: string;
  unit: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

// Mock components - replace these with your actual components
const UpdateValueModal: React.FC<UpdateValueModalProps> = ({ title, unit, onSave, onClose }) => {
  const [value, setValue] = useState('');
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={`Enter value in ${unit}`}
          className="w-full p-2 border rounded-lg mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={() => onSave(value)}
            className="flex-1 bg-pink-500 text-white py-2 rounded-lg"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, onClose }) => {
  const today = new Date();
  
  return (
    <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg p-4 z-10">
      <div className="text-center mb-2">
        <h3 className="font-bold">Select Date</h3>
      </div>
      <button
        onClick={() => {
          onDateSelect(today);
          onClose();
        }}
        className="w-full text-left p-2 hover:bg-gray-100 rounded"
      >
        Today
      </button>
      <button
        onClick={onClose}
        className="w-full mt-2 bg-gray-200 text-gray-700 py-1 rounded"
      >
        Close
      </button>
    </div>
  );
};

const ProgressScreen: React.FC<ProgressScreenProps> = ({ onNavigate, userData, updateUserData }) => {
    const [progressView, setProgressView] = useState('Weight');
    const [weightHistory, setWeightHistory] = useState<WeightEntry[]>([
        { date: '2025-07-01', weight: 72 },
        { date: '2025-07-15', weight: 71 },
        { date: '2025-08-01', weight: 70 },
    ]);
    const [isUpdateWeightModalOpen, setUpdateWeightModalOpen] = useState(false);
    const [isSetGoalModalOpen, setSetGoalModalOpen] = useState(false);

    const latestWeightEntry = weightHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    const handleUpdateWeight = (newWeight: string) => {
        const today = new Date().toISOString().split('T')[0];
        setWeightHistory(prev => [...prev, { date: today, weight: parseFloat(newWeight) }]);
        updateUserData({ weight: parseFloat(newWeight) });
        setUpdateWeightModalOpen(false);
    };
    
    const handleSetGoal = (newGoal: string) => {
        updateUserData({ goalWeight: parseFloat(newGoal) });
        setSetGoalModalOpen(false);
    };
    
    const chartData = weightHistory.map(entry => ({
        name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: entry.weight
    }));

    const BodyMeasurementView = () => {
        const bodyParts = ['Neck', 'Waist', 'Chest', 'Hips', 'Left Upper Arm', 'Right Upper Arm', 'Left Thigh', 'Right Thigh', 'Left Calf', 'Right Calf'];
        const [measurements, setMeasurements] = useState<Record<string, string>>(Object.fromEntries(bodyParts.map(p => [p, ''])));
        const [history, setHistory] = useState<any[]>([]);
        const [selectedPart, setSelectedPart] = useState('Chest');
        const [goal, setGoal] = useState('');
        const [currentDate, setCurrentDate] = useState(new Date());
        const [isCalendarOpen, setCalendarOpen] = useState(false);

        const handleSave = () => {
            const today = new Date().toISOString().split('T')[0];
            const newEntry = { date: today, ...measurements };
            setHistory(prev => [...prev, newEntry]);
            setMeasurements(Object.fromEntries(bodyParts.map(p => [p, ''])));
        };
        
        const measurementChartData = history.map(entry => ({
            name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            value: parseFloat(entry[selectedPart]) || 0
        })).filter(item => item.value > 0);
        
        const formatDateHeader = (date: Date) => {
            const today = new Date();
            if (date.toDateString() === today.toDateString()) return "Today";
            return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        };
    
        const changeDay = (offset: number) => {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + offset);
                return newDate;
            });
        };

        return (
            <div>
                <div className="flex justify-between items-center mb-4 relative">
                    <button onClick={() => changeDay(-1)} className="text-gray-600 p-2 rounded-full hover:bg-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <button onClick={() => setCalendarOpen(true)} className="font-bold text-lg">
                        {formatDateHeader(currentDate)}
                    </button>
                    <button onClick={() => changeDay(1)} className="text-gray-600 p-2 rounded-full hover:bg-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </button>
                    {isCalendarOpen && (
                        <Calendar 
                            onDateSelect={(date) => setCurrentDate(date)} 
                            onClose={() => setCalendarOpen(false)} 
                        />
                    )}
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                        {bodyParts.map(part => (
                            <div key={part}>
                                <label className="text-gray-600">{part} (cm)</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 38.5" 
                                    value={measurements[part]}
                                    onChange={(e) => setMeasurements(prev => ({...prev, [part]: e.target.value}))}
                                    className="w-full p-2 mt-1 border rounded-lg hide-arrows" 
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={handleSave} className="w-full bg-pink-100 text-pink-600 font-bold py-3 rounded-lg border-2 border-pink-500 mb-6">
                        Save Measurement
                    </button>

                    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
                        <h3 className="font-bold text-center mb-2">Measurement Trend</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                             <div>
                                <label>Select body part</label>
                                <select 
                                    value={selectedPart} 
                                    onChange={(e) => setSelectedPart(e.target.value)} 
                                    className="w-full p-1 mt-1 border rounded-md"
                                >
                                    {bodyParts.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                             </div>
                              <div>
                                <label>Goal (cm)</label>
                                <input 
                                    type="number" 
                                    placeholder="e.g. 90" 
                                    value={goal} 
                                    onChange={(e) => setGoal(e.target.value)} 
                                    className="w-full p-1 mt-1 border rounded-lg hide-arrows" 
                                />
                             </div>
                        </div>
                         <div className="flex-grow" style={{ width: '100%', height: 200 }}>
                            <ResponsiveContainer>
                                <LineChart data={measurementChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" fontSize={10} />
                                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} fontSize={10} />
                                    <Tooltip />
                                    {goal && (
                                        <ReferenceLine 
                                            y={parseFloat(goal)} 
                                            label={{ 
                                                value: `Goal: ${goal}cm`, 
                                                position: 'insideTopLeft', 
                                                fill: '#ec4899', 
                                                fontSize: 10 
                                            }} 
                                            stroke="#ec4899" 
                                            strokeDasharray="3 3" 
                                        />
                                    )}
                                    <Line 
                                        type="monotone" 
                                        dataKey="value" 
                                        stroke="#ec4899" 
                                        strokeWidth={2} 
                                        dot={{ r: 4 }} 
                                        activeDot={{ r: 6 }} 
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                         </div>
                    </div>
                </div>
            </div>
        );
    };

    const WeightView = () => {
        const [viewBy, setViewBy] = useState('Last 4 weeks');
        return (
            <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-xs text-gray-500">
                            Latest Weight on {new Date(latestWeightEntry.date).toLocaleDateString('en-US', {day: 'numeric', month: 'short'})}
                        </p>
                        <p className="font-bold text-lg">{latestWeightEntry.weight} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-xs text-gray-500">Goal Weight</p>
                        <p className="font-bold text-lg">{userData.goalWeight || 'N/A'} kg</p>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <button 
                        onClick={() => setUpdateWeightModalOpen(true)} 
                        className="w-full bg-pink-500 text-white font-bold py-2 rounded-lg"
                    >
                        Update Weight
                    </button>
                    <button 
                        onClick={() => setSetGoalModalOpen(true)} 
                        className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded-lg"
                    >
                        Set Goal
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
                     <h3 className="font-bold text-center">History & Trend</h3>
                     <div className="text-right text-sm mb-2">
                         <select 
                            value={viewBy} 
                            onChange={(e) => setViewBy(e.target.value)} 
                            className="p-1 border rounded-md"
                         >
                             <option>Last 4 weeks</option>
                             <option>Last 3 months</option>
                             <option>Last 6 months</option>
                             <option>Last 1 year</option>
                         </select>
                     </div>
                     <div className="flex-grow" style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" fontSize={10} />
                                <YAxis domain={['dataMin - 5', 'dataMax + 5']} fontSize={10} />
                                <Tooltip />
                                {userData.goalWeight && (
                                    <ReferenceLine 
                                        y={userData.goalWeight} 
                                        label={{ 
                                            value: `Goal: ${userData.goalWeight}kg`, 
                                            position: 'insideTopLeft', 
                                            fill: '#ec4899', 
                                            fontSize: 10 
                                        }} 
                                        stroke="#ec4899" 
                                        strokeDasharray="3 3" 
                                    />
                                )}
                                <Line 
                                    type="monotone" 
                                    dataKey="weight" 
                                    stroke="#ec4899" 
                                    strokeWidth={2} 
                                    dot={{ r: 4 }} 
                                    activeDot={{ r: 6 }} 
                                />
                            </LineChart>
                        </ResponsiveContainer>
                     </div>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            {isUpdateWeightModalOpen && (
                <UpdateValueModal 
                    title="Update Weight" 
                    unit="kg"
                    onSave={handleUpdateWeight} 
                    onClose={() => setUpdateWeightModalOpen(false)} 
                />
            )}
            {isSetGoalModalOpen && (
                <UpdateValueModal 
                    title="Set Goal Weight" 
                    unit="kg"
                    onSave={handleSetGoal} 
                    onClose={() => setSetGoalModalOpen(false)} 
                />
            )}

            {/* Non-scrolling Header */}
            <div className="p-6 pb-4">
                <div className="flex items-center mb-4">
                    <button onClick={() => onNavigate('home')} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                        </svg>
                    </button>
                    <h1 className="text-xl font-bold text-center flex-grow">Progress</h1>
                    <div className="w-10"></div> {/* Placeholder for alignment */}
                </div>
                <div>
                    <select 
                        value={progressView} 
                        onChange={(e) => setProgressView(e.target.value)} 
                        className="w-full p-2 border rounded-lg bg-white"
                    >
                        <option>Weight</option>
                        <option>Body Measurement</option>
                    </select>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto px-6 pb-6">
                {progressView === 'Weight' ? <WeightView /> : <BodyMeasurementView />}
            </div>
        </div>
    );
};

export default ProgressScreen;