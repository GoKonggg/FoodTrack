import React, { useState, useEffect } from 'react';
// Asumsi recharts tersedia di lingkungan
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell, Legend } from 'recharts';


// --- Database Makanan Dummy ---
const foodDatabase = [
    { id: 1, name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, portion: '100 gr' },
    { id: 2, name: 'Brown Rice', calories: 111, protein: 2.6, carbs: 23, fat: 0.9, portion: '1 cup' },
    { id: 3, name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, portion: '1 cup' },
    { id: 4, name: 'Salmon', calories: 208, protein: 20, carbs: 0, fat: 13, portion: '100 gr' },
    { id: 5, name: 'Avocado', calories: 160, protein: 2, carbs: 9, fat: 15, portion: '1/2 fruit' },
    { id: 6, name: 'Egg', calories: 78, protein: 6, carbs: 0.6, fat: 5, portion: '1 large' },
    { id: 7, name: 'Oatmeal', calories: 158, protein: 5.9, carbs: 27, fat: 3.2, portion: '1 cup cooked' },
    { id: 8, name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, portion: '1 medium' },
];


// --- SVG Icons ---
const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 8.841C34.553 4.806 29.613 2.5 24 2.5C11.983 2.5 2.5 11.983 2.5 24s9.483 21.5 21.5 21.5c11.983 0 21.5-9.483 21.5-21.5c0-1.452-.146-2.862-.389-4.251z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c-2.213 4.013-2.213 8.992 0 13.005L15.31 31.199C12.546 27.936 12.546 22.064 15.31 18.801l-9.004-4.11z"></path>
    <path fill="#4CAF50" d="M24 45.5c5.613 0 10.553-2.306 14.198-6.199l-8.895-6.903c-2.013 1.41-4.505 2.102-7.303 2.102c-5.223 0-9.66-3.343-11.303-7.961L2.694 31.309C6.306 39.691 14.463 45.5 24 45.5z"></path>
    <path fill="#1976D2" d="M43.611 20.083H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l8.895 6.903c4.956-4.571 8.291-11.48 8.291-19.474c0-1.452-.146-2.862-.389-4.251z"></path>
  </svg>
);
const AppleIcon = () => (
  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10.323,2.4C8.66,2.4,7.333,3.525,6.5,4.85C5.5,3.725,4.015,2.4,2.489,2.4C0.439,2.4-0.953,4.212,0.793,6.55C2.46,8.8,3.203,10.087,4.45,10.087c1.246,0,1.646-0.862,3.021-0.862c1.375,0,1.75,0.862,3.021,0.862c1.247,0,2.08-1.275,3.656-3.537C15.947,4.212,14.561,2.4,12.511,2.4C11.836,3.875,10.323,2.4,10.323,2.4z M8.903,1.262c0.75-0.9,1.875-1.425,2.85-1.237c-0.075,1.012-0.6,2.137-1.425,2.812C9.553,2.05,8.553,1.6,8.903,1.262z M8.228,11.2c-0.375,1.5,0.15,3.075,1.05,4.125c0.75,0.825,1.725,1.237,2.625,1.237c0.15,0,0.3-0.012,0.45-0.025c0.15,0.012,0.225,0.025,0.375,0.025c0.9,0,1.875-0.412,2.625-1.237c0.975-1.05,1.425-2.587,1.05-4.125H8.228z"></path>
  </svg>
);
const EmailIcon = () => (
    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>
);
const CalendarIcon = () => (
    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
);
const HomeIcon = ({isActive}: {isActive: boolean}) => (<svg className={`w-7 h-7 ${isActive ? 'text-pink-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>);
const ProgressIcon = ({isActive}: {isActive: boolean}) => (<svg className={`w-7 h-7 ${isActive ? 'text-pink-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>);
const FriendsIcon = ({isActive}: {isActive: boolean}) => (<svg className={`w-7 h-7 ${isActive ? 'text-pink-500' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 15a4 4 0 00-8 0v3h8v-3z"></path></svg>);
const SettingsIcon = ({isActive}: {isActive: boolean}) => (<svg className={`w-7 h-7 ${isActive ? 'text-pink-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>);
const AddFoodIcon = () => (<svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>);
const LockIcon = () => (<svg className="w-8 h-8 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>);
const ShareFoodIcon = () => (<svg className="w-6 h-6 text-pink-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-5M3 4h5v5m-2.121 9.879l4.242-4.242m0 0l4.242 4.242m-4.242-4.242L6.343 6.343m0 0l4.243 4.243"></path></svg>);
const LogFoodIcon = () => (<svg className="w-6 h-6 text-pink-500 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>);
const SearchIcon = () => (<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>);
const UploadIcon = () => (<svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>);
const ChevronRightIcon = () => (<svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>);
const FireIcon = () => (<svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path d="M18.303 8.264c0 4.296-3.268 7.76-7.303 7.76s-7.303-3.464-7.303-7.76c0-2.434 1.228-4.583 3.134-5.952.992-1.84 2.89-3.11 5.02-3.11 2.06 0 3.882 1.157 4.904 2.922.4.63.648 1.35.648 2.14v.24zM11 2.25c-2.48 0-4.5 2.02-4.5 4.5 0 1.51.75 2.833 1.902 3.64C7.03 11.23 6 12.78 6 14.5c0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5c0-1.92-1.22-3.58-2.9-4.25.99-1.04 1.59-2.41 1.59-3.92 0-2.83-2.3-5.13-5.13-5.13z"/></svg>);
const TrophyIcon = () => (<svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M15.5 2.5a1.5 1.5 0 00-3 0V3H7.5V2.5a1.5 1.5 0 00-3 0V3H4a1 1 0 00-1 1v2.5a1 1 0 001 1h.5v5.25a3.25 3.25 0 003.25 3.25h3.5a3.25 3.25 0 003.25-3.25V7.5h.5a1 1 0 001-1V4a1 1 0 00-1-1h-.5V2.5zM12.5 7H11v1.5a.5.5 0 01-1 0V7H8.5a.5.5 0 010-1H10V4.5a.5.5 0 011 0V6h1.5a.5.5 0 010 1z"/></svg>);
const LeafIcon = () => (<svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 3.293a1 1 0 011.414 0l.001.001c.39.39.39 1.023 0 1.414l-8.5 8.5a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9.5 11.086l7.793-7.793a1 1 0 011.414 0z" /><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM3.536 3.536a7 7 0 119.9 9.9 7 7 0 01-9.9-9.9z" /></svg>);
const TargetIcon = () => (<svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.5a6.5 6.5 0 100-13 6.5 6.5 0 000 13z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.5v2m0 10v2m-6.5-6.5h2m10 0h2"></path></svg>);
const BellIcon = () => (<svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.33 16.25a7.5 7.5 0 01-12.66 0m12.66 0A7.5 7.5 0 003.67 16.25m11.66 0H3.67m11.66 0a2.5 2.5 0 10-5 0h5zM12 2.5a2.5 2.5 0 012.5 2.5v.5a5 5 0 011.12 9.87V17.5a2.5 2.5 0 11-7.24 0v-2.13a5 5 0 011.12-9.87v-.5a2.5 2.5 0 012.5-2.5z"></path></svg>);
const ClockIcon = () => (<svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>);

interface BookmarkIconProps {
  isBookmarked: boolean;
  onClick: () => void;
}

const BookmarkIcon = ({ isBookmarked, onClick }:BookmarkIconProps) => (
    <svg onClick={onClick} className="w-6 h-6" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
    </svg>
);

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
);

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

const Calendar = ({ onDateSelect, onClose }:CalendarProps) => {
    const [date, setDate] = useState(new Date());
    const daysOfWeek = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const changeMonth = (offset : number) => setDate(new Date(date.setMonth(date.getMonth() + offset)));
    const changeYear = (offset:number) => setDate(new Date(date.setFullYear(date.getFullYear() + offset)));

    const renderDays = () => {
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>);
        for (let i = 1; i <= daysInMonth; i++) {
            const fullDate = new Date(year, month, i);
            days.push(
                <div key={i} className="w-10 h-10 flex items-center justify-center">
                    <button onClick={() => { onDateSelect(fullDate); onClose(); }} className="w-9 h-9 rounded-full hover:bg-pink-200 transition-colors">{i}</button>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="absolute top-full mt-2 w-full max-w-sm bg-white border-2 border-pink-200 rounded-lg shadow-lg p-4 z-10">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeYear(-1)} className="font-bold p-2 rounded-md hover:bg-gray-100">{'<<'}</button>
                <button onClick={() => changeMonth(-1)} className="font-bold p-2 rounded-md hover:bg-gray-100">{'<'}</button>
                <div className="font-bold text-pink-700">{monthNames[date.getMonth()]} {date.getFullYear()}</div>
                <button onClick={() => changeMonth(1)} className="font-bold p-2 rounded-md hover:bg-gray-100">{'>'}</button>
                <button onClick={() => changeYear(1)} className="font-bold p-2 rounded-md hover:bg-gray-100">{'>>'}</button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500">{daysOfWeek.map(day => <div key={day}>{day}</div>)}</div>
            <div className="grid grid-cols-7 gap-1 mt-2">{renderDays()}</div>
        </div>
    );
};

interface NavigationProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

interface SplashScreenProps {
  onNavigate: (screen: string) => void;
}

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

interface UserData {
  goal?: string;
  weeklyTarget?: number;
  birthday?: string;
}

interface GoalScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

interface WeeklyTargetScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}

interface AdditionalGoalsScreenProps {
  onNavigate: (screen: string) => void;
  openModal: () => void;
}

interface BirthdayScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

// Fixed Components
const BottomNav = ({ activeScreen, onNavigate }: NavigationProps) => {
    const [isAddMenuOpen, setAddMenuOpen] = useState(false);
    
    return (
        <div className="relative">
            {isAddMenuOpen && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-lg p-2 z-20">
                    <ul>
                        <li>
                            <button onClick={() => {onNavigate('logFood'); setAddMenuOpen(false);}} className="w-full text-left p-3 flex items-center hover:bg-gray-100 rounded-lg">
                                <LogFoodIcon /> Log Food
                            </button>
                        </li>
                        <li>
                            <button onClick={() => {onNavigate('shareFood'); setAddMenuOpen(false);}} className="w-full text-left p-3 flex items-center hover:bg-gray-100 rounded-lg">
                                <ShareFoodIcon /> Share Food
                            </button>
                        </li>
                    </ul>
                    <button onClick={() => setAddMenuOpen(false)} className="w-full text-center p-3 mt-1 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                </div>
            )}
            <div className="bg-white shadow-t-md">
                <div className="flex justify-around items-center h-16">
                    <button onClick={() => onNavigate('home')} className="flex flex-col items-center justify-center w-full">
                        <HomeIcon isActive={activeScreen === 'home'} />
                        <span className={`text-xs ${activeScreen === 'home' ? 'text-pink-500' : 'text-gray-400'}`}>Home</span>
                    </button>
                    <button onClick={() => onNavigate('progress')} className="flex flex-col items-center justify-center w-full">
                        <ProgressIcon isActive={activeScreen === 'progress'}/>
                        <span className={`text-xs ${activeScreen === 'progress' ? 'text-pink-500' : 'text-gray-400'}`}>Progress</span>
                    </button>
                    <div className="w-14 h-14"></div>
                    <button onClick={() => onNavigate('friends')} className="flex flex-col items-center justify-center w-full">
                        <FriendsIcon isActive={activeScreen === 'friends'} />
                        <span className={`text-xs ${activeScreen === 'friends' ? 'text-pink-500' : 'text-gray-400'}`}>Friends</span>
                    </button>
                    <button onClick={() => onNavigate('settings')} className="flex flex-col items-center justify-center w-full">
                        <SettingsIcon isActive={activeScreen === 'settings'} />
                        <span className={`text-xs ${activeScreen === 'settings' ? 'text-pink-500' : 'text-gray-400'}`}>Settings</span>
                    </button>
                </div>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <button onClick={() => setAddMenuOpen(!isAddMenuOpen)} className="bg-pink-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

const SplashScreen = ({ onNavigate }: SplashScreenProps) => (
    <div className="flex flex-col h-full bg-gray-50 p-6 font-sans">
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Healthy Food Dish" 
                className="w-full max-w-xs md:max-w-sm h-auto rounded-2xl shadow-lg object-cover mb-8" 
                onError={(e) => { 
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; 
                    target.src='https://placehold.co/400x400/e2e8f0/4a5568?text=Food+Image'; 
                }} 
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Food Tracker</h1>
            <p className="text-gray-600 text-base md:text-lg max-w-md">Track your meals, connect with friends, and achieve your health goals together.</p>
        </div>
        <div className="w-full flex flex-col items-center pb-4 space-y-4">
            <button onClick={() => onNavigate('goal')} className="w-full max-w-sm bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-4 rounded-full text-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">Get Started</button>
            <p className="text-gray-600">Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }} className="font-bold text-pink-500 hover:underline">Log In</a>
            </p>
        </div>
    </div>
);

const LoginScreen = ({ onNavigate }: LoginScreenProps) => (
    <div className="flex flex-col h-full bg-white p-6 font-sans">
        <div className="flex items-center mb-10">
            <button onClick={() => onNavigate('splash')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800 mx-auto">Log In</h1>
            <div className="w-6"></div>
        </div>
        <div className="flex-grow flex flex-col">
            <div className="space-y-4 mb-6">
                <input type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
            </div>
            <button onClick={() => onNavigate('home')} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors">Log In</button>
            <a href="#" className="text-center text-pink-500 hover:underline mt-4 text-sm">Forgot password?</a>
            <div className="flex items-center my-8">
                <hr className="flex-grow border-t border-gray-300" />
                <span className="mx-4 text-gray-500 text-sm">OR</span>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <div className="space-y-4">
                <button onClick={() => onNavigate('home')} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    <GoogleIcon /> Continue with Google
                </button>
                <button onClick={() => onNavigate('home')} className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                    <AppleIcon /> Continue with Apple
                </button>
            </div>
        </div>
    </div>
);

const GoalScreen = ({ onNavigate, updateUserData }: GoalScreenProps) => {
    const handleGoalSelection = (goal: string) => {
        updateUserData({ goal });
        if (goal === 'Maintain Weight') {
            onNavigate('additionalGoals');
        } else {
            onNavigate('weeklyTarget');
        }
    };
    
    return (
        <div className="flex flex-col h-full bg-white p-6 font-sans">
            <div className="flex items-center mb-10">
                <button onClick={() => onNavigate('splash')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-grow flex flex-col items-center text-center mt-8">
                <p className="text-gray-600 text-lg mb-2">Help us understand your goals better!</p>
                <h1 className="text-2xl font-bold text-pink-500 mb-10">Which goal fits you best right now?</h1>
                <div className="w-full max-w-sm space-y-4">
                    <button onClick={() => handleGoalSelection('Fat Loss')} className="w-full text-lg text-gray-700 font-semibold py-4 px-4 border-2 border-gray-300 rounded-lg hover:bg-pink-100 hover:border-pink-500 transition-colors">Fat Loss</button>
                    <button onClick={() => handleGoalSelection('Maintain Weight')} className="w-full text-lg text-gray-700 font-semibold py-4 px-4 border-2 border-gray-300 rounded-lg hover:bg-pink-100 hover:border-pink-500 transition-colors">Maintain Weight</button>
                    <button onClick={() => handleGoalSelection('Muscle Gain')} className="w-full text-lg text-gray-700 font-semibold py-4 px-4 border-2 border-gray-300 rounded-lg hover:bg-pink-100 hover:border-pink-500 transition-colors">Muscle Gain</button>
                </div>
            </div>
        </div>
    );
};

const WeeklyTargetScreen = ({ onNavigate, updateUserData, userData }: WeeklyTargetScreenProps) => {
    const [target, setTarget] = useState<number>(0.5);
    const goalType = userData.goal === 'Fat Loss' ? 'lose' : 'gain';

    const handleContinue = () => {
        updateUserData({ weeklyTarget: target });
        onNavigate('additionalGoals');
    };

    return (
        <div className="flex flex-col h-full bg-white p-6 font-sans">
            <div className="flex items-center mb-10">
                <button onClick={() => onNavigate('goal')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-grow flex flex-col items-center text-center mt-8">
                <p className="text-gray-600 text-lg mb-2">Awesome! Let's set a weekly goal.</p>
                <h1 className="text-2xl font-bold text-pink-500 mb-10">How much weight do you want to {goalType} per week?</h1>
                <div className="relative w-full max-w-sm">
                    <input 
                        type="number" 
                        value={target} 
                        onChange={(e) => setTarget(parseFloat(e.target.value) || 0)} 
                        className="w-full text-center px-12 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg hide-arrows" 
                    />
                    <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg text-gray-500 pointer-events-none">KG</span>
                </div>
                <div className="w-full max-w-sm mt-auto pb-4">
                    <button onClick={handleContinue} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
                </div>
            </div>
        </div>
    );
};

const AdditionalGoalsScreen = ({ onNavigate, openModal }: AdditionalGoalsScreenProps) => (
    <div className="flex flex-col h-full bg-white p-6 font-sans">
        <div className="flex items-center mb-10">
            <button onClick={() => onNavigate('goal')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
        </div>
        <div className="flex-grow flex flex-col items-center text-center">
            <p className="text-gray-600 text-lg mb-2">Great, Let's Continue.</p>
            <h1 className="text-2xl font-bold text-pink-500 mb-8">What additional goals do you have?</h1>
            <div className="w-full max-w-sm space-y-4 text-left">
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-400 focus:ring-pink-500" />
                    <span className="ml-4 text-lg text-gray-700">Increase Energy</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-400 focus:ring-pink-500" />
                    <span className="ml-4 text-lg text-gray-700">Drink More Water</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-400 focus:ring-pink-500" />
                    <span className="ml-4 text-lg text-gray-700">Improve Sleep Quality</span>
                </label>
                <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg hover:bg-pink-50 transition-colors cursor-pointer">
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-400 focus:ring-pink-500" />
                    <span className="ml-4 text-lg text-gray-700">Reduce Sugar Intake</span>
                </label>
            </div>
            <div className="w-full max-w-sm mt-8 text-left">
                <p className="text-gray-600 mb-2">Got other goals we didn't mention?</p>
                <input type="text" placeholder="Tell us here:" className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
            </div>
            <div className="w-full max-w-sm mt-auto pb-4">
                <button onClick={openModal} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
            </div>
        </div>
    </div>
);

const BirthdayScreen = ({ onNavigate, updateUserData }: BirthdayScreenProps) => {
    const [birthday, setBirthday] = useState<string>('');
    const [isCalendarOpen, setCalendarOpen] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
        if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
        setBirthday(value);
    };

    const handleDateSelect = (date: Date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        setBirthday(`${day}/${month}/${year}`);
        setCalendarOpen(false);
    };
    
    const handleContinue = () => {
        updateUserData({ birthday });
        onNavigate('gender');
    };

    return (
        <div className="flex flex-col h-full bg-white p-6 font-sans">
            <div className="flex items-center mb-10">
                <button onClick={() => onNavigate('additionalGoals')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>
            </div>
            <div className="flex-grow flex flex-col items-center text-center mt-8">
                <p className="text-gray-600 text-lg mb-2">Nice! Now, let's get to know you a bit more.</p>
                <h1 className="text-2xl font-bold text-pink-500 mb-2">When's your birthday?</h1>
                <p className="text-gray-500 text-sm mb-10">Don't worry, this stays private.</p>
                <div className="relative w-full max-w-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                        <button onClick={() => setCalendarOpen(!isCalendarOpen)} className="cursor-pointer">
                            <CalendarIcon />
                        </button>
                    </div>
                    <input 
                        type="text" 
                        placeholder="DD/MM/YYYY" 
                        value={birthday} 
                        onChange={handleInputChange} 
                        maxLength={10} 
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg" 
                    />
                    {isCalendarOpen && <Calendar onDateSelect={handleDateSelect} onClose={() => setCalendarOpen(false)} />}
                </div>
                <div className="w-full max-w-sm mt-auto pb-4">
                    <button onClick={handleContinue} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
                </div>
            </div>
        </div>
    );
};

interface GenderScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

interface UserData {
  gender: string;
 
}
const GenderScreen = ({ onNavigate, updateUserData }:GenderScreenProps) => {
    const handleSelect = (gender :string) => {
        updateUserData({ gender });
        onNavigate('height');
    };
    return (
        <div className="flex flex-col h-full bg-white p-6 font-sans">
            <div className="flex items-center mb-10"><button onClick={() => onNavigate('birthday')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button></div>
            <div className="flex-grow flex flex-col items-center text-center mt-12">
                <p className="text-gray-600 text-lg mb-2">We want to understand you better.</p>
                <h1 className="text-2xl font-bold text-pink-500 mb-2">What's Your Gender?</h1>
                <p className="text-gray-500 text-sm mb-10">So we can personalize your experience even better!</p>
                <div className="w-full max-w-sm space-y-4">
                    <button onClick={() => handleSelect('Man')} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-lg shadow-md transition-colors text-lg">Man</button>
                    <button onClick={() => handleSelect('Woman')} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-lg shadow-md transition-colors text-lg">Woman</button>
                </div>
            </div>
        </div>
    );
};

// --- Interface Section ---
interface UserData {
  gender: string;
  height: number;
  weight: number;
  goalWeight: number;
}

interface HeightScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

interface WeightScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
}

interface GoalWeightScreenProps {
  onNavigate: (screen: string) => void;
  updateUserData: (data: Partial<UserData>) => void;
  userData: UserData;
}

interface SignUpScreenProps {
  onNavigate: (screen: string) => void;
}

// --- HeightScreen ---
const HeightScreen = ({ onNavigate, updateUserData }: HeightScreenProps) => {
  const [height, setHeight] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const parsed = parseInt(height, 10);
    if (isNaN(parsed) || parsed < 100 || parsed > 260) {
      setError("Please enter a valid height (in cm).");
      return;
    }
    setError('');
    updateUserData({ height: parsed });
    onNavigate('weight');
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 font-sans">
      <div className="flex items-center mb-10">
        <button onClick={() => onNavigate('gender')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center text-center mt-8">
        <p className="text-gray-600 text-lg mb-2">Got it. Let's talk about your body stats.</p>
        <h1 className="text-2xl font-bold text-pink-500 mb-2">What's Your Height?</h1>
        <p className="text-gray-500 text-sm mb-10">This helps us understand your starting point.</p>
        <div className="relative w-full max-w-sm">
          <input
            type="number"
            placeholder="170"
            value={height}
            onChange={e => setHeight(e.target.value)}
            className="w-full text-center px-12 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg hide-arrows"
          />
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg text-gray-500 pointer-events-none">CM</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="w-full max-w-sm mt-auto pb-4">
          <button onClick={handleContinue} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
        </div>
      </div>
    </div>
  );
};

// --- WeightScreen ---
const WeightScreen = ({ onNavigate, updateUserData }: WeightScreenProps) => {
  const [weight, setWeight] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const parsed = parseInt(weight, 10);
    if (isNaN(parsed) || parsed < 30 || parsed > 300) {
      setError("Please enter a valid weight (in kg).");
      return;
    }
    setError('');
    updateUserData({ weight: parsed });
    onNavigate('goalWeight');
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 font-sans">
      <div className="flex items-center mb-10">
        <button onClick={() => onNavigate('height')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center text-center mt-8">
        <p className="text-gray-600 text-lg mb-2">Getting closer! Just a few more details.</p>
        <h1 className="text-2xl font-bold text-pink-500 mb-2">What's Your Current Weight?</h1>
        <p className="text-gray-500 text-sm mb-10">So we can track your progress accurately.</p>
        <div className="relative w-full max-w-sm">
          <input
            type="number"
            placeholder="60"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            className="w-full text-center px-12 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg hide-arrows"
          />
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg text-gray-500 pointer-events-none">KG</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="w-full max-w-sm mt-auto pb-4">
          <button onClick={handleContinue} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
        </div>
      </div>
    </div>
  );
};

// --- GoalWeightScreen ---
const GoalWeightScreen = ({ onNavigate, updateUserData, userData }: GoalWeightScreenProps) => {
  const [goalWeight, setGoalWeight] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    const parsed = parseInt(goalWeight, 10);
    if (isNaN(parsed) || parsed < 30 || parsed > 300) {
      setError("Please enter your goal weight (in kg).");
      return;
    }

    if (userData.goal === 'Fat Loss' && parsed >= userData.weight) {
      setError(`Goal weight must be less than your current weight of ${userData.weight} kg.`);
      return;
    }
    if (userData.goal === 'Muscle Gain' && parsed <= userData.weight) {
      setError(`Goal weight must be more than your current weight of ${userData.weight} kg.`);
      return;
    }

    setError('');
    updateUserData({ goalWeight: parsed });
    onNavigate('signUp');
  };

  return (
    <div className="flex flex-col h-full bg-white p-6 font-sans">
      <div className="flex items-center mb-10">
        <button onClick={() => onNavigate('weight')} className="text-gray-600 hover:text-gray-900 p-2 -ml-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
      </div>
      <div className="flex-grow flex flex-col items-center text-center mt-8">
        <p className="text-gray-600 text-lg mb-2">One last thing — let's talk goals.</p>
        <h1 className="text-2xl font-bold text-pink-500 mb-2">What's Your Goal Weight?</h1>
        <p className="text-gray-500 text-sm mb-10">Knowing your goal keeps everything on track.</p>
        <div className="relative w-full max-w-sm">
          <input
            type="number"
            placeholder="60"
            value={goalWeight}
            onChange={e => setGoalWeight(e.target.value)}
            className="w-full text-center px-12 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-lg hide-arrows"
          />
          <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg text-gray-500 pointer-events-none">KG</span>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="w-full max-w-sm mt-auto pb-4">
          <button onClick={handleContinue} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
        </div>
      </div>
    </div>
  );
};

// --- SignUpScreen ---
const SignUpScreen = ({ onNavigate }: SignUpScreenProps) => (
  <div className="flex flex-col h-full bg-white p-6 font-sans justify-center items-center text-center">
    <h1 className="text-3xl font-bold text-pink-500 mb-2">You're all set</h1>
    <p className="text-lg text-gray-700 mb-10">Sign up and start your journey now!!!</p>
    <div className="w-full max-w-sm space-y-4">
      <button
        onClick={() => onNavigate('home')}
        className="w-full flex items-center justify-center py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-lg"
      >
        <span className="mr-2">📧</span> Continue With Email
      </button>
      <button
        onClick={() => onNavigate('home')}
        className="w-full flex items-center justify-center py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-lg"
      >
        <span className="mr-2">🟦</span> Continue with Google
      </button>
      <button
        onClick={() => onNavigate('home')}
        className="w-full flex items-center justify-center py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-lg"
      >
        <span className="mr-2"></span> Continue with Apple
      </button>
    </div>
  </div>
);

interface FoodItem {
  id: string | number;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  description?: string;
}

interface LoggedMeals {
  [dateKey: string]: {
    [mealType: string]: FoodItem[];
  };
}

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  userData: UserData;
  loggedMeals: LoggedMeals;
  currentDate: Date;
  onDateChange: (arg: number | Date) => void;
}

const HomeScreen = ({
  onNavigate,
  userData,
  loggedMeals,
  currentDate,
  onDateChange,
}: HomeScreenProps) => {
  const [calories, setCalories] = useState({ target: 2000, consumed: 0 });
  const [macros, setMacros] = useState({
    carbs: { target: 250, consumed: 0 },
    protein: { target: 150, consumed: 0 },
    fat: { target: 67, consumed: 0 },
  });
  const [isHomeCalendarOpen, setHomeCalendarOpen] = useState(false);

  useEffect(() => {
    if (
      userData.gender &&
      userData.weight &&
      userData.height &&
      userData.birthday
    ) {
      const birthDateParts = userData.birthday.split("/");
      if (birthDateParts.length !== 3) return;
      const birthDate = new Date(
        `${birthDateParts[2]}-${birthDateParts[1]}-${birthDateParts[0]}`
      );
      const age = new Date().getFullYear() - birthDate.getFullYear();

      let bmr;
      if (userData.gender === "Man") {
        bmr = 10 * userData.weight + 6.25 * userData.height - 5 * age + 5;
      } else {
        bmr = 10 * userData.weight + 6.25 * userData.height - 5 * age - 161;
      }
      const tdee = bmr * 1.375;

      let finalCalories = tdee;
      const weeklyKcalChange =
        (parseFloat(String(userData.weeklyTarget || "0")) * 7700) / 7;

      if (userData.goal === "Fat Loss") {
        finalCalories -= weeklyKcalChange;
      } else if (userData.goal === "Muscle Gain") {
        finalCalories += weeklyKcalChange;
      }

      setCalories((prev) => ({ ...prev, target: Math.round(finalCalories) }));
      setMacros({
        carbs: { ...macros.carbs, target: Math.round((finalCalories * 0.4) / 4) },
        protein: {
          ...macros.protein,
          target: Math.round((finalCalories * 0.3) / 4),
        },
        fat: { ...macros.fat, target: Math.round((finalCalories * 0.3) / 9) },
      });
    }
    // eslint-disable-next-line
  }, [userData]);

  useEffect(() => {
    const dateKey = currentDate.toISOString().split("T")[0];
    const todaysMeals = loggedMeals[dateKey] || {};

    const totals = Object.values(todaysMeals)
      .flat()
      .reduce(
        (acc, food) => {
          acc.calories += food.calories;
          acc.protein += food.protein;
          acc.carbs += food.carbs;
          acc.fat += food.fat;
          return acc;
        },
        { calories: 0, protein: 0, carbs: 0, fat: 0 }
      );

    setCalories((prev) => ({
      ...prev,
      consumed: Math.round(totals.calories),
    }));
    setMacros((prev) => ({
      carbs: { ...prev.carbs, consumed: Math.round(totals.carbs) },
      protein: { ...prev.protein, consumed: Math.round(totals.protein) },
      fat: { ...prev.fat, consumed: Math.round(totals.fat) },
    }));
  }, [loggedMeals, currentDate]);

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatDateHeader = (date: Date) => {
    if (isToday(date)) return "Today";

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) return "Yesterday";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";

    return date.toLocaleDateString("id-ID", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const MealSection = ({ title }: { title: string }) => {
    const dateKey = currentDate.toISOString().split("T")[0];
    const mealItems =
      (loggedMeals[dateKey] && loggedMeals[dateKey][title]) || [];
    return (
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-lg">{title}</h4>
          <button
            onClick={() => onNavigate("logFood")}
            className="p-1 rounded-full hover:bg-pink-100"
          >
            <AddFoodIcon />
          </button>
        </div>
        {mealItems.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-4 border-2 border-dashed rounded-lg">
            <p>No {title.toLowerCase()} logged yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {mealItems.map((food, index) => (
              <div
                key={food.id || index}
                className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{food.name}</p>
                  <p className="text-sm text-gray-500">{food.portion}</p>
                </div>
                <p className="font-semibold text-gray-700">
                  {food.calories} kal
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 font-sans">
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6 relative">
          <button
            onClick={() => onDateChange(-1)}
            className="text-gray-600 p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button
            onClick={() => setHomeCalendarOpen(true)}
            className="font-bold text-lg"
          >
            {formatDateHeader(currentDate)}
          </button>
          <button
            onClick={() => onDateChange(1)}
            className="text-gray-600 p-2 rounded-full hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
          {/* Calendar component (opsional) */}
        </div>

        <div className="bg-white p-4 rounded-xl shadow-md mb-6">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-bold text-gray-800">Calories</h3>
            <p className="text-gray-500 font-medium">
              {calories.consumed} / {calories.target}
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-pink-500 h-2.5 rounded-full"
              style={{
                width: `${Math.min(
                  (calories.consumed / calories.target) * 100,
                  100
                )}%`,
              }}
            ></div>
          </div>
        </div>

        <div
          onClick={() => onNavigate("premiumMacros")}
          className="bg-white p-6 rounded-xl shadow-md mb-6 cursor-pointer"
        >
          <h3 className="font-bold text-gray-800 text-center mb-4">Macros</h3>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
                <span className="text-sm font-semibold">
                  {macros.carbs.consumed}/{macros.carbs.target} gr
                </span>
              </div>
              <p className="text-gray-500">Carbs</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
                <span className="text-sm font-semibold">
                  {macros.protein.consumed}/{macros.protein.target} gr
                </span>
              </div>
              <p className="text-gray-500">Protein</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full border-8 border-gray-200 flex items-center justify-center mb-2">
                <span className="text-sm font-semibold">
                  {macros.fat.consumed}/{macros.fat.target} gr
                </span>
              </div>
              <p className="text-gray-500">Fat</p>
            </div>
          </div>
        </div>

        <div>
          <MealSection title="Breakfast" />
          <MealSection title="Lunch" />
          <MealSection title="Dinner" />
          <MealSection title="Snacks" />
        </div>
      </div>
    </div>
  );
};

interface LogFoodScreenProps {
  onNavigate: (screen: string) => void;
  onLogFood: (food: FoodItem, mealType: string, date: Date) => void;
  date: Date;
  myFoods: FoodItem[];
}

const LogFoodScreen = ({ onNavigate, onLogFood, date, myFoods }:LogFoodScreenProps) => {
    const [activeMeal, setActiveMeal] = useState('Breakfast');
    const [activeTab, setActiveTab] = useState('All Food');
    const [searchTerm, setSearchTerm] = useState('');

    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    const handleLog = (food :FoodItem) => {
        onLogFood(food, activeMeal, date);
        onNavigate('home');
    };

    const filteredFoods = foodDatabase.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const filteredMyFoods = myFoods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6 pb-0">
                <div className="flex items-center mb-6">
                    <button onClick={() => onNavigate('home')} className="text-gray-600 p-2 -ml-2 rounded-full hover:bg-gray-200">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 mx-auto">Meal Time!</h1>
                    <div className="w-6"></div>
                </div>

                <div className="flex justify-between mb-4">
                    {mealTypes.map(meal => (
                        <button 
                            key={meal}
                            onClick={() => setActiveMeal(meal)}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeMeal === meal ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 border'}`}
                        >
                            {meal}
                        </button>
                    ))}
                </div>

                <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search foods.."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>

                <div className="flex border-b mb-4">
                    <button onClick={() => setActiveTab('All Food')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'All Food' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'}`}>All Food</button>
                    <button onClick={() => setActiveTab('My Food')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'My Food' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'}`}>My Food</button>
                    <button onClick={() => onNavigate('quickAdd')} className={`py-2 px-4 text-sm font-semibold ${activeTab === 'Quick Add' ? 'border-b-2 border-pink-500 text-pink-500' : 'text-gray-500'}`}>Quick Add</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 pb-6">
                {activeTab === 'All Food' && filteredFoods.map(food => (
                    <div key={food.id} className="flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-sm">
                        <div>
                            <p className="font-semibold">{food.name}</p>
                            <p className="text-sm text-gray-500">{food.calories} kal, {food.portion}</p>
                        </div>
                        <button onClick={() => handleLog(food)} className="text-pink-500 p-2 rounded-full hover:bg-pink-100">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </button>
                    </div>
                ))}
                {activeTab === 'My Food' && (
                    <>
                        {filteredMyFoods.map(food => (
                             <div key={food.id} className="flex justify-between items-center bg-white p-3 mb-2 rounded-lg shadow-sm">
                                <div>
                                    <p className="font-semibold">{food.name}</p>
                                    <p className="text-sm text-gray-500">{food.calories} kal, {food.portion}</p>
                                </div>
                                <button onClick={() => handleLog(food)} className="text-pink-500 p-2 rounded-full hover:bg-pink-100">
                                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                </button>
                            </div>
                        ))}
                        <button onClick={() => onNavigate('createFood')} className="w-full text-center py-3 mt-4 bg-pink-100 text-pink-600 font-bold rounded-lg">Custom</button>
                    </>
                )}
            </div>
        </div>
    );
};
// --- INTERFACE ---
interface CreateFoodScreenProps {
  onNavigate: (screen: string) => void;
  updateNewFoodData: (data: Partial<FoodItem>) => void;
}

interface CreateFoodDetailScreenProps {
  onNavigate: (screen: string) => void;
  newFoodData: Partial<FoodItem>;
  onCreateFood: (food: FoodItem) => void;
}

interface QuickAddScreenProps {
  onNavigate: (screen: string) => void;
  onLogFood: (food: FoodItem, mealType: string, date: Date) => void;
  date: Date;
}



const CreateFoodScreen = ({ onNavigate, updateNewFoodData }:CreateFoodScreenProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [servingSize, setServingSize] = useState('');

    const handleContinue = () => {
        updateNewFoodData({ name, description, portion: servingSize });
        onNavigate('createFoodDetail');
    };

    return (
        <div className="flex flex-col h-full bg-white p-6 font-sans">
            <div className="flex items-center mb-10">
                <button onClick={() => onNavigate('logFood')} className="text-gray-600 p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">Food Name</h1>
                <div className="w-6"></div>
            </div>
            <div className="flex-grow flex flex-col space-y-6">
                <div>
                    <label className="text-gray-600 mb-2 block">Food Name</label>
                    <input type="text" placeholder="Enter food name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
                <div>
                    <label className="text-gray-600 mb-2 block">Food Description</label>
                    <input type="text" placeholder="Enter food description" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
                <div>
                    <label className="text-gray-600 mb-2 block">Serving Size</label>
                    <input type="text" placeholder="e.g. 1 cup, 100g" value={servingSize} onChange={e => setServingSize(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
            </div>
            <div className="w-full mt-auto pb-4">
                <button onClick={handleContinue} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Continue</button>
            </div>
        </div>
    );
};

const CreateFoodDetailScreen = ({ onNavigate, newFoodData, onCreateFood }:CreateFoodDetailScreenProps) => {
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');

    const handleCreate = () => {
    const finalFood: FoodItem = {
        id: Date.now(),
        name: newFoodData.name ?? '',                  // fallback ke string kosong
        portion: newFoodData.portion ?? '',            // fallback ke string kosong
        description: newFoodData.description,          // ini boleh undefined, sudah sesuai interface opsional
        calories: parseFloat(calories) || 0,
        carbs: parseFloat(carbs) || 0,
        protein: parseFloat(protein) || 0,
        fat: parseFloat(fat) || 0,
    };
    onCreateFood(finalFood);
    onNavigate('logFood');
};

    return (
        <div className="flex flex-col h-full bg-white p-6 font-sans">
            <div className="flex items-center mb-10">
                <button onClick={() => onNavigate('createFood')} className="text-gray-600 p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <h1 className="text-xl font-bold text-gray-800 mx-auto">Nutrition</h1>
                <div className="w-6"></div>
            </div>
            <div className="flex-grow flex flex-col space-y-4">
                <div>
                    <label className="text-gray-600 mb-2 block text-left">Calories</label>
                    <input type="number" value={calories} onChange={e => setCalories(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
                <div>
                    <label className="text-gray-600 mb-2 block text-left">Carbs</label>
                    <input type="number" value={carbs} onChange={e => setCarbs(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
                <div>
                    <label className="text-gray-600 mb-2 block text-left">Protein</label>
                    <input type="number" value={protein} onChange={e => setProtein(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
                <div>
                    <label className="text-gray-600 mb-2 block text-left">Fat</label>
                    <input type="number" value={fat} onChange={e => setFat(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                </div>
            </div>
            <div className="w-full mt-auto pb-4">
                <button onClick={handleCreate} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">Create Food</button>
            </div>
        </div>
    );
};

const QuickAddScreen = ({ onNavigate, onLogFood, date }:QuickAddScreenProps) => {
    // Simulate premium status for the prototype
    const [isPremium, setIsPremium] = useState(false);

    const [activeMeal, setActiveMeal] = useState('Breakfast');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

    const handleQuickAdd = () => {
        if (!calories) return;
        const foodItem = {
            id: Date.now(),
            name: `Quick Add - ${calories} kal`,
            calories: parseFloat(calories) || 0,
            protein: parseFloat(protein) || 0,
            carbs: parseFloat(carbs) || 0,
            fat: parseFloat(fat) || 0,
            portion: 'Quick Add'
        };
        onLogFood(foodItem, activeMeal, date);
        onNavigate('home');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <button onClick={() => onNavigate('logFood')} className="text-gray-600 p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                </button>
                <h1 className="text-xl font-bold text-gray-800">Quick Add</h1>
                <button onClick={handleQuickAdd} className="text-pink-500 p-2 rounded-full hover:bg-pink-100">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </button>
            </div>

            {/* Meal Type Buttons */}
            <div className="flex justify-between mb-6">
                {mealTypes.map(meal => (
                    <button 
                        key={meal}
                        onClick={() => setActiveMeal(meal)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${activeMeal === meal ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 border'}`}
                    >
                        {meal}
                    </button>
                ))}
            </div>
            
            {/* Premium Toggle (for prototype demonstration) */}
            <div className="flex items-center justify-center mb-4">
                <span className="mr-3 text-sm font-medium text-gray-900">Regular User</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isPremium} onChange={() => setIsPremium(!isPremium)} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                </label>
                <span className="ml-3 text-sm font-medium text-gray-900">Premium User</span>
            </div>


            {/* Main Content with Transition */}
            <div className="flex-grow space-y-4">
                <div>
                    <label className="text-gray-600 mb-2 block text-left">Calories</label>
                    <input 
                        type="number"
                        placeholder="Enter Calorie Amount"
                        value={calories}
                        onChange={(e) => setCalories(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                
                <div className={`transition-all duration-500 ease-in-out ${isPremium ? 'opacity-0 max-h-0' : 'opacity-100 max-h-40'}`}>
                     <div className="text-center p-4 border border-gray-300 rounded-lg bg-gray-100">
                        <p className="font-bold text-gray-700">Premium Feature</p>
                        <p className="text-sm text-gray-500">Unlock Premium to Quick Add Macros</p>
                    </div>
                </div>

                <div className={`space-y-4 transition-all duration-500 ease-in-out ${isPremium ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                     <div>
                        <label className="text-gray-600 mb-2 block text-left">Carbs</label>
                        <input 
                            type="number"
                            placeholder="Enter Carbs Amount"
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                     <div>
                        <label className="text-gray-600 mb-2 block text-left">Protein</label>
                        <input 
                            type="number"
                            placeholder="Enter Protein Amount"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                     <div>
                        <label className="text-gray-600 mb-2 block text-left">Fat</label>
                        <input 
                            type="number"
                            placeholder="Enter Fat Amount"
                            value={fat}
                            onChange={(e) => setFat(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-auto pb-4">
                <button onClick={handleQuickAdd} className="w-full bg-pink-500 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">
                    Quick Add
                </button>
            </div>
        </div>
    );
};
interface MacroFood {
  name: string;
  value: number;
  unit: string;
}
interface MacroDistribution {
  name: string; // e.g. 'Breakfast'
  value: number;
}
interface MacroTrend {
  name: string; // e.g. 'Mon'
  value: number;
}

interface PremiumMacrosScreenProps {
  onNavigate: (screen: string) => void;
  userData: {
    macros?: {
      carbs: { target: number };
      protein: { target: number };
      fat: { target: number };
    };
  };
}
interface ProgressScreenProps {
  onNavigate: (screen: string) => void;
  userData: {
    goalWeight?: number;
    // ... add other userData as needed
  };
  updateUserData: (data: Partial<any>) => void; // you can replace any with UserData type if exists
}

interface WeightEntry {
  date: string; // yyyy-mm-dd
  weight: number;
}

interface UpdateValueModalProps {
  title: string;
  unit: string;
  onSave: (value: string) => void;
  onClose: () => void;
}

// Calendar and Modal, reuse your own interface if you already have!
interface CalendarProps {
  onDateSelect: (date: Date) => void;
  onClose: () => void;
}

// If you want BodyMeasurementView state/history strict, bisa gini:
interface BodyMeasurementEntry {
  date: string;
  [key: string]: string | number; // each body part: value cm
}
const PremiumMacrosScreen = ({ onNavigate, userData }:PremiumMacrosScreenProps) => {
    type MacroTab = 'Carbs' | 'Protein' | 'Fat';
    const [isPremium, setIsPremium] = useState(false);
    const [activeMacroTab, setActiveMacroTab] = useState<MacroTab>('Carbs');

    const [highestTimeFilter, setHighestTimeFilter] = useState('Week');
    const [distTimeFilter, setDistTimeFilter] = useState('Week');
    const [trendTimeFilter, setTrendTimeFilter] = useState('Week');

    

    // --- Dummy Data for Insights ---
    const macroData: Record<MacroTab, {
    target: number;
    highestFoods: { name: string; value: number; unit: string }[];
    distribution: { name: string; value: number }[];
    trend: { name: string; value: number }[];
    }> = {
        Carbs: {
            target: userData.macros?.carbs.target || 250,
            highestFoods: [
                { name: 'Brown Rice', value: 45, unit: 'g' },
                { name: 'Oatmeal', value: 27, unit: 'g' },
                { name: 'Apple', value: 25, unit: 'g' },
            ],
            distribution: [
                { name: 'Breakfast', value: 60 },
                { name: 'Lunch', value: 90 },
                { name: 'Dinner', value: 120 },
                { name: 'Snacks', value: 30 },
            ],
            trend: [
                { name: 'Mon', value: 240 }, { name: 'Tue', value: 260 }, { name: 'Wed', value: 220 },
                { name: 'Thu', value: 280 }, { name: 'Fri', value: 250 }, { name: 'Sat', value: 300 },
                { name: 'Sun', value: 270 },
            ],
        },
        Protein: {
            target: userData.macros?.protein.target || 150,
            highestFoods: [
                { name: 'Chicken Breast', value: 62, unit: 'g' },
                { name: 'Salmon', value: 40, unit: 'g' },
                { name: 'Egg', value: 12, unit: 'g' },
            ],
            distribution: [
                { name: 'Breakfast', value: 20 },
                { name: 'Lunch', value: 70 },
                { name: 'Dinner', value: 55 },
                { name: 'Snacks', value: 5 },
            ],
            trend: [
                { name: 'Mon', value: 140 }, { name: 'Tue', value: 155 }, { name: 'Wed', value: 160 },
                { name: 'Thu', value: 145 }, { name: 'Fri', value: 150 }, { name: 'Sat', value: 170 },
                { name: 'Sun', value: 165 },
            ],
        },
        Fat: {
            target: userData.macros?.fat.target || 67,
            highestFoods: [
                { name: 'Avocado', value: 15, unit: 'g' },
                { name: 'Salmon', value: 13, unit: 'g' },
                { name: 'Egg', value: 10, unit: 'g' },
            ],
            distribution: [
                { name: 'Breakfast', value: 10 },
                { name: 'Lunch', value: 25 },
                { name: 'Dinner', value: 20 },
                { name: 'Snacks', value: 12 },
            ],
            trend: [
                { name: 'Mon', value: 60 }, { name: 'Tue', value: 70 }, { name: 'Wed', value: 65 },
                { name: 'Thu', value: 55 }, { name: 'Fri', value: 68 }, { name: 'Sat', value: 75 },
                { name: 'Sun', value: 72 },
            ],
        },
    };

    
    const COLORS = ['#FF8042', '#0088FE', '#00C49F', '#FFBB28'];
    const currentMacroData = macroData[activeMacroTab];

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6 pb-0">
                <div className="flex items-center mb-6">
                    <button onClick={() => onNavigate('home')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <h1 className="text-xl font-bold text-center flex-grow">Advanced Macro Insights</h1>
                    <div className="w-6"></div>
                </div>
                 {/* Premium Toggle (for prototype demonstration) */}
                <div className="flex items-center justify-center mb-4">
                    <span className="mr-3 text-sm font-medium text-gray-900">Regular User</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isPremium} onChange={() => setIsPremium(!isPremium)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                    <span className="ml-3 text-sm font-medium text-gray-900">Premium User</span>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4 relative">
                {/* Locked View */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 ${isPremium ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <LockIcon />
                    <h1 className="text-xl font-bold text-gray-800">Premium Feature</h1>
                    <p className="text-gray-500 mb-6">Unlock Advanced Macro Insights</p>
                    <button className="w-full max-w-sm bg-pink-200 text-pink-700 font-bold py-4 rounded-lg shadow-md hover:bg-pink-300 transition-colors">
                        Unlock Now
                    </button>
                </div>
                
                {/* Unlocked View */}
                <div className={`transition-opacity duration-500 ${isPremium ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="flex justify-center bg-gray-200 rounded-lg p-1 mb-4">
                        {(['Carbs', 'Protein', 'Fat'] as MacroTab[]).map(macro => (
    <button
      key={macro}
      onClick={() => setActiveMacroTab(macro)}
      className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${
        activeMacroTab === macro ? 'bg-white text-pink-500 shadow' : 'text-gray-600'
      }`}
    >
      {macro}
    </button>
  ))}
                    </div>
                    <div className="space-y-6">
                        {/* Highest Section */}
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <h3 className="font-bold mb-2">Highest in {activeMacroTab}</h3>
                            <div className="text-xs mb-3">
                                 {['Day', 'Week', 'Month'].map(filter => (
                                    <button key={filter} onClick={() => setHighestTimeFilter(filter)} className={`px-3 py-1 rounded-full mr-2 ${highestTimeFilter === filter ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{filter}</button>
                                 ))}
                            </div>
                            <div className="space-y-2">
                                {currentMacroData.highestFoods.map((food, index) => (
                                    <div key={index} className="flex items-center text-sm">
                                        <span className="font-semibold text-gray-700 w-1/2">{food.name}</span>
                                        <div className="w-1/2 flex items-center">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                                <div className="bg-pink-500 h-2.5 rounded-full" style={{width: `${(food.value / currentMacroData.highestFoods[0].value) * 100}%`}}></div>
                                            </div>
                                            <span className="text-gray-500">{food.value}{food.unit}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Distribution Section */}
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <h3 className="font-bold mb-2">Distribution by Meal</h3>
                            <div className="text-xs mb-3">
                                 {['Day', 'Week', 'Month'].map(filter => (
                                    <button key={filter} onClick={() => setDistTimeFilter(filter)} className={`px-3 py-1 rounded-full mr-2 ${distTimeFilter === filter ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{filter}</button>
                                 ))}
                            </div>
                            <div style={{ width: '100%', height: 150 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={currentMacroData.distribution} cx="50%" cy="50%" innerRadius={40} outerRadius={60} fill="#8884d8" paddingAngle={5} dataKey="value" labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                            {currentMacroData.distribution.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                        </Pie>
                                        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-2">Insight: You tend to consume most of your {activeMacroTab.toLowerCase()} during dinner.</p>
                        </div>

                        {/* Trend Section */}
                        <div className="bg-white p-4 rounded-xl shadow-sm">
                            <h3 className="font-bold mb-2">Consumption Trend</h3>
                            <div className="text-xs mb-3">
                                 {['Day', 'Week', 'Month'].map(filter => (
                                    <button key={filter} onClick={() => setTrendTimeFilter(filter)} className={`px-3 py-1 rounded-full mr-2 ${trendTimeFilter === filter ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{filter}</button>
                                 ))}
                            </div>
                            <div style={{ width: '100%', height: 200 }}>
                                 <ResponsiveContainer>
                                    <LineChart data={currentMacroData.trend} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" fontSize={10} />
                                        <YAxis fontSize={10} />
                                        <Tooltip />
                                        <ReferenceLine y={currentMacroData.target} label={{ value: `Target: ${currentMacroData.target}g`, position: 'insideTopLeft', fill: '#ef4444', fontSize: 10 }} stroke="#ef4444" strokeDasharray="3 3" />
                                        <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProgressScreen = ({ onNavigate, userData, updateUserData }:ProgressScreenProps) => {
    const [progressView, setProgressView] = useState('Weight');
    const [weightHistory, setWeightHistory] = useState([
        { date: '2025-07-01', weight: 72 },
        { date: '2025-07-15', weight: 71 },
        { date: '2025-08-01', weight: 70 },
    ]);
    const [isUpdateWeightModalOpen, setUpdateWeightModalOpen] = useState(false);
    const [isSetGoalModalOpen, setSetGoalModalOpen] = useState(false);

    const latestWeightEntry = weightHistory.sort((a,b) => new Date(b.date) - new Date(a.date))[0];

    const handleUpdateWeight = (newWeight) => {
        const today = new Date().toISOString().split('T')[0];
        setWeightHistory(prev => [...prev, { date: today, weight: parseFloat(newWeight) }]);
        updateUserData({ weight: parseFloat(newWeight) });
        setUpdateWeightModalOpen(false);
    };
    
    const handleSetGoal = (newGoal) => {
        updateUserData({ goalWeight: parseFloat(newGoal) });
        setSetGoalModalOpen(false);
    };
    
    const chartData = weightHistory.map(entry => ({
        name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        weight: entry.weight
    }));

    const BodyMeasurementView = () => {
        const bodyParts = ['Neck', 'Waist', 'Chest', 'Hips', 'Left Upper Arm', 'Right Upper Arm', 'Left Thigh', 'Right Thigh', 'Left Calf', 'Right Calf'];
        const [measurements, setMeasurements] = useState(Object.fromEntries(bodyParts.map(p => [p, ''])));
        const [history, setHistory] = useState([]);
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
            value: entry[selectedPart]
        })).filter(item => item.value);
        
        const formatDateHeader = (date) => {
            const today = new Date();
            if (date.toDateString() === today.toDateString()) return "Today";
            return date.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
        };
    
        const changeDay = (offset) => {
            setCurrentDate(prevDate => {
                const newDate = new Date(prevDate);
                newDate.setDate(newDate.getDate() + offset);
                return newDate;
            });
        };

        return (
            <div>
                <div className="flex justify-between items-center mb-4 relative">
                    <button onClick={() => changeDay(-1)} className="text-gray-600 p-2 rounded-full hover:bg-gray-200"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <button onClick={() => setCalendarOpen(true)} className="font-bold text-lg">{formatDateHeader(currentDate)}</button>
                    <button onClick={() => changeDay(1)} className="text-gray-600 p-2 rounded-full hover:bg-gray-200"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg></button>
                    {isCalendarOpen && <Calendar onDateSelect={(date) => setCurrentDate(date)} onClose={() => setCalendarOpen(false)} />}
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
                    <button onClick={handleSave} className="w-full bg-pink-100 text-pink-600 font-bold py-3 rounded-lg border-2 border-pink-500 mb-6">Save Measurement</button>

                    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
                        <h3 className="font-bold text-center mb-2">Measurement Trend</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm mb-2">
                             <div>
                                <label>Select body part</label>
                                <select value={selectedPart} onChange={(e) => setSelectedPart(e.target.value)} className="w-full p-1 mt-1 border rounded-md">
                                    {bodyParts.map(p => <option key={p}>{p}</option>)}
                                </select>
                             </div>
                              <div>
                                <label>Goal (cm)</label>
                                <input type="number" placeholder="e.g. 90" value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-1 mt-1 border rounded-lg hide-arrows" />
                             </div>
                        </div>
                         <div className="flex-grow" style={{ width: '100%', height: 200 }}>
                            <ResponsiveContainer>
                                <LineChart data={measurementChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" fontSize={10} />
                                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} fontSize={10} />
                                    <Tooltip />
                                    {goal && <ReferenceLine y={goal} label={{ value: `Goal: ${goal}cm`, position: 'insideTopLeft', fill: '#ec4899', fontSize: 10 }} stroke="#ec4899" strokeDasharray="3 3" />}
                                    <Line type="monotone" dataKey="value" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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
                        <p className="text-xs text-gray-500">Latest Weight on {new Date(latestWeightEntry.date).toLocaleDateString('en-US', {day: 'numeric', month: 'short'})}</p>
                        <p className="font-bold text-lg">{latestWeightEntry.weight} kg</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                        <p className="text-xs text-gray-500">Goal Weight</p>
                        <p className="font-bold text-lg">{userData.goalWeight || 'N/A'} kg</p>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4 mb-6">
                    <button onClick={() => setUpdateWeightModalOpen(true)} className="w-full bg-pink-500 text-white font-bold py-2 rounded-lg">Update Weight</button>
                    <button onClick={() => setSetGoalModalOpen(true)} className="w-full bg-gray-200 text-gray-700 font-bold py-2 rounded-lg">Set Goal</button>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md flex flex-col">
                     <h3 className="font-bold text-center">History & Trend</h3>
                     <div className="text-right text-sm mb-2">
                         <select value={viewBy} onChange={(e) => setViewBy(e.target.value)} className="p-1 border rounded-md">
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
                                <ReferenceLine y={userData.goalWeight} label={{ value: `Goal: ${userData.goalWeight}kg`, position: 'insideTopLeft', fill: '#ec4899', fontSize: 10 }} stroke="#ec4899" strokeDasharray="3 3" />
                                <Line type="monotone" dataKey="weight" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <h1 className="text-xl font-bold text-center flex-grow">Progress</h1>
                    <div className="w-10"></div> {/* Placeholder for alignment */}
                </div>
                <div>
                    <select value={progressView} onChange={(e) => setProgressView(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
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

const UpdateValueModal = ({ title, unit, onSave, onClose }:UpdateValueModalProps) => {
    const [value, setValue] = useState('');
    return (
        <Modal onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <div className="relative">
                <input 
                    type="number" 
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full text-center p-3 border-2 rounded-lg text-lg hide-arrows"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-lg text-gray-500">{unit}</span>
            </div>
            <button onClick={() => onSave(value)} className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg mt-4">Save</button>
        </Modal>
    );
};

const FriendsScreen = ({ onNavigate, onAddSharedFood }) => {
    const [activeTab, setActiveTab] = useState('Activity Feed');
    const [isPremium, setIsPremium] = useState(false); // Demo state
    const [activityFeedData, setActivityFeedData] = useState([
        { id: 1, name: 'Sarah Chen', handle: '@sarahfit', time: '30 minutes ago', action: 'Logged BreakFast', details: ['420 Calories', 'Oatmeal', 'Green tea'], likes: 3, comments: 2, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=SC', bookmarked: false },
        { id: 2, name: 'Mike', handle: '@mikel', time: '50 minutes ago', action: 'Hit Daily Calorie Goal', details: ['7 day streak!', '2300 cal'], likes: 3, comments: 2, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M', bookmarked: true },
        { id: 3, name: 'Jane Doe', handle: '@janed', time: '2 hours ago', action: 'Shared a new recipe!', type: 'shared_food', food: { name: 'Keto Chicken Salad', calories: 350, protein: 40, carbs: 5, fat: 20, portion: '1 bowl' }, likes: 22, comments: 8, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=JD', bookmarked: false }
    ]);
    const [friendsData, setFriendsData] = useState([
        { id: 1, name: 'Mike', handle: '@mikel', following: false, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M' },
        { id: 2, name: 'Mike', handle: '@mikel', following: false, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M' },
        { id: 3, name: 'Mike', handle: '@mikel', following: false, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M' }
    ]);
    const challenges = [
        { id: 1, title: "7-Day Sugar Detox", description: "Hindari tambahan gula selama 7 hari.", icon: <FireIcon />, status: 'Join' },
        { id: 2, title: "Protein Power-Up", description: "Capai target protein harian selama 5 hari.", icon: <TrophyIcon />, status: 'In Progress' },
        { id: 3, title: "Eat the Rainbow", description: "Konsumsi 5 porsi buah & sayur beragam warna.", icon: <LeafIcon />, status: 'Join' },
    ];

    const toggleFollow = (id) => {
        setFriendsData(friendsData.map(friend => friend.id === id ? { ...friend, following: !friend.following } : friend));
    };
    
    const toggleBookmark = (id) => {
        setActivityFeedData(activityFeedData.map(item => 
            item.id === id ? { ...item, bookmarked: !item.bookmarked } : item
        ));
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6 pb-0">
                <h1 className="text-xl font-bold text-center mb-4">Fitness Buddies</h1>
                <div className="flex justify-center bg-gray-200 rounded-lg p-1 mb-4">
                    <button onClick={() => setActiveTab('Activity Feed')} className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Activity Feed' ? 'bg-white text-pink-500 shadow' : 'text-gray-600'}`}>Activity</button>
                    <button onClick={() => setActiveTab('Friends')} className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Friends' ? 'bg-white text-pink-500 shadow' : 'text-gray-600'}`}>Friends</button>
                    <button onClick={() => setActiveTab('Challenges')} className={`w-1/3 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Challenges' ? 'bg-white text-pink-500 shadow' : 'text-gray-600'}`}>Challenges</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6">
                {activeTab === 'Activity Feed' && (
                    <div className="space-y-4">
                        {/* Premium Toggle for Demo */}
                        <div className="flex items-center justify-center p-2 bg-yellow-100 rounded-lg">
                            <span className="mr-3 text-sm font-medium text-yellow-800">Regular</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={isPremium} onChange={() => setIsPremium(!isPremium)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                            </label>
                            <span className="ml-3 text-sm font-medium text-yellow-800">Premium</span>
                        </div>

                        {activityFeedData.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center mb-3">
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
                                    <div className="flex-grow">
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.handle} • {item.time}</p>
                                    </div>
                                    <button className="text-gray-400 hover:text-pink-500 p-2">
                                        <BookmarkIcon isBookmarked={item.bookmarked} onClick={() => toggleBookmark(item.id)} />
                                    </button>
                                </div>
                                <p className="font-semibold mb-2">{item.action}</p>
                                {item.type !== 'shared_food' && (
                                    <div className="pl-4 border-l-2 border-pink-200">
                                        {item.details.map((detail, index) => (
                                            <p key={index} className="text-sm text-gray-600">{detail.startsWith('✓') ? detail : `✓ ${detail}`}</p>
                                        ))}
                                    </div>
                                )}
                                {item.type === 'shared_food' && (
                                    <div className="mt-2">
                                        <div className="bg-gray-100 p-3 rounded-lg border">
                                            <p className="font-bold">{item.food.name}</p>
                                            <p className="text-xs text-gray-500">{item.food.calories} cal | P: {item.food.protein}g, C: {item.food.carbs}g, F: {item.food.fat}g</p>
                                        </div>
                                        {isPremium ? (
                                             <button onClick={() => onAddSharedFood(item.food)} className="w-full mt-2 bg-pink-100 text-pink-600 font-bold py-2 rounded-lg text-sm">Add to My Food</button>
                                        ) : (
                                             <button className="w-full mt-2 bg-gray-200 text-gray-500 font-bold py-2 rounded-lg text-sm cursor-not-allowed">
                                                <LockIcon className="w-4 h-4 inline mr-1" /> Add to My Food (Premium)
                                             </button>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center text-gray-500 mt-3 text-sm">
                                    <span>❤️ {item.likes}</span>
                                    <span className="ml-4">💬 {item.comments}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'Friends' && (
                    <div>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <SearchIcon />
                            </div>
                            <input type="text" placeholder="Search Friends" className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"/>
                        </div>
                        <div className="space-y-3">
                            {friendsData.map(friend => (
                                <div key={friend.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                                    <div className="flex items-center">
                                        <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                                        <div>
                                            <p className="font-semibold">{friend.name}</p>
                                            <p className="text-sm text-gray-500">{friend.handle}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => toggleFollow(friend.id)} className={`px-4 py-1.5 text-sm font-semibold rounded-full ${friend.following ? 'bg-gray-200 text-gray-700' : 'bg-pink-100 text-pink-600'}`}>
                                        {friend.following ? 'Following' : 'Follow'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'Challenges' && (
                     <div className="relative">
                        <div className="space-y-4 blur-sm">
                            {challenges.map(challenge => (
                                <div key={challenge.id} className="bg-white p-4 rounded-xl shadow-sm flex items-center">
                                    <div className="mr-4 p-3 bg-pink-100 rounded-lg">{challenge.icon}</div>
                                    <div className="flex-grow">
                                        <h3 className="font-bold">{challenge.title}</h3>
                                        <p className="text-sm text-gray-500">{challenge.description}</p>
                                    </div>
                                    <button className={`px-4 py-1.5 text-sm font-semibold rounded-full ${challenge.status === 'Join' ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                                        {challenge.status}
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center rounded-xl">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <h3 className="text-lg font-bold text-gray-700">Coming Soon!</h3>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const ShareFoodScreen = ({ onNavigate, allFoods, setFoodToShare }) => {
    const [activeTab, setActiveTab] = useState('Create Food');
    const [foodName, setFoodName] = useState('');
    const [foodDesc, setFoodDesc] = useState('');
    const [servingSize, setServingSize] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreateAndShare = () => {
        const newFood = {
            name: foodName,
            description: foodDesc,
            portion: servingSize,
            calories: parseFloat(calories) || 0,
            carbs: parseFloat(carbs) || 0,
            protein: parseFloat(protein) || 0,
            fat: parseFloat(fat) || 0,
        };
        setFoodToShare(newFood);
        onNavigate('createPost');
    };
    
    const handleFindAndShare = (food) => {
        setFoodToShare(food);
        onNavigate('createPost');
    };

    const filteredFoods = allFoods.filter(food => 
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6 pb-0">
                <div className="flex items-center mb-4">
                    <button onClick={() => onNavigate('home')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <h1 className="text-xl font-bold text-center flex-grow">Share Food</h1>
                    <div className="w-6"></div>
                </div>
                <div className="flex justify-center bg-gray-200 rounded-lg p-1 mb-4">
                    <button onClick={() => setActiveTab('Create Food')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Create Food' ? 'bg-white text-pink-600 shadow' : 'text-gray-600'}`}>Create Food</button>
                    <button onClick={() => setActiveTab('Find From List')} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${activeTab === 'Find From List' ? 'bg-white text-pink-600 shadow' : 'text-gray-600'}`}>Find From List</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4">
                {activeTab === 'Create Food' ? (
                    <div className="space-y-4">
                        <input type="text" placeholder="Food Name" value={foodName} onChange={e => setFoodName(e.target.value)} className="w-full p-3 border rounded-lg" />
                        <input type="text" placeholder="Food Description" value={foodDesc} onChange={e => setFoodDesc(e.target.value)} className="w-full p-3 border rounded-lg" />
                        <input type="text" placeholder="Serving Size" value={servingSize} onChange={e => setServingSize(e.target.value)} className="w-full p-3 border rounded-lg" />
                        <input type="number" placeholder="Calories" value={calories} onChange={e => setCalories(e.target.value)} className="w-full p-3 border rounded-lg" />
                        <div>
                            <p className="font-semibold mb-2 text-center">Macros</p>
                            <div className="grid grid-cols-3 gap-2">
                                <input type="number" placeholder="Carbs (g)" value={carbs} onChange={e => setCarbs(e.target.value)} className="w-full p-2 border rounded-lg text-center" />
                                <input type="number" placeholder="Protein (g)" value={protein} onChange={e => setProtein(e.target.value)} className="w-full p-2 border rounded-lg text-center" />
                                <input type="number" placeholder="Fat (g)" value={fat} onChange={e => setFat(e.target.value)} className="w-full p-2 border rounded-lg text-center" />
                            </div>
                        </div>
                        <button onClick={handleCreateAndShare} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg mt-4">Share</button>
                    </div>
                ) : (
                    <div>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><SearchIcon /></div>
                            <input type="text" placeholder="Search Food..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 p-3 border rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            {filteredFoods.map(food => (
                                <div key={food.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                                    <div>
                                        <p className="font-semibold">{food.name}</p>
                                        <p className="text-sm text-gray-500">{food.calories} Kal</p>
                                    </div>
                                    <button onClick={() => handleFindAndShare(food)} className="text-pink-600 font-semibold text-sm border border-pink-600 px-3 py-1 rounded-full">Share</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CreatePostScreen = ({ onNavigate, foodToShare, showToast }) => {
    const [caption, setCaption] = useState('');
    const [shareOption, setShareOption] = useState('Public');
    const [isShareOptionsOpen, setShareOptionsOpen] = useState(false);
    const [isSelectFriendsOpen, setSelectFriendsOpen] = useState(false);
    const [selectedFriends, setSelectedFriends] = useState([]);
    const [friendsList] = useState([
        { id: 1, name: 'Sarah Chen', avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=SC' },
        { id: 2, name: 'Mike', avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M' }
    ]);

    const handlePost = () => {
        showToast("Post Created!");
        onNavigate('friends');
    };

    const handleSelectFriend = (friendId) => {
        setSelectedFriends(prev => 
            prev.includes(friendId) ? prev.filter(id => id !== friendId) : [...prev, friendId]
        );
    };

    const getShareOptionText = () => {
        if (shareOption === 'Specific Friends') {
            return selectedFriends.length > 0 ? `${selectedFriends.length} Teman Terpilih` : 'Teman Tertentu...';
        }
        return shareOption;
    };

    const SelectFriendsModal = ({onClose}) => (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm h-2/3 flex flex-col" onClick={(e) => e.stopPropagation()}>
                <div className="p-4 border-b">
                    <div className="flex items-center">
                        <button onClick={onClose} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                        <h2 className="font-bold text-lg text-center flex-grow">Pilih Teman</h2>
                        <div className="w-6"></div>
                    </div>
                </div>
                <div className="flex-grow overflow-y-auto p-4">
                    {friendsList.map(friend => (
                        <div key={friend.id} className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => handleSelectFriend(friend.id)}>
                            <div className="flex items-center">
                                <img src={friend.avatar} alt={friend.name} className="w-10 h-10 rounded-full mr-3" />
                                <span>{friend.name}</span>
                            </div>
                            <input type="checkbox" checked={selectedFriends.includes(friend.id)} readOnly className="form-checkbox h-5 w-5 text-pink-500 rounded border-gray-400 focus:ring-pink-500" />
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t">
                    <button onClick={() => { setShareOption('Specific Friends'); onClose(); }} className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg">Selesai ({selectedFriends.length})</button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans p-6">
            <div className="flex items-center mb-6">
                <button onClick={() => onNavigate('shareFood')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <h1 className="text-xl font-bold text-center flex-grow">Create Post</h1>
                <div className="w-6"></div>
            </div>
            <div className="space-y-4">
                <div className="border rounded-lg p-3 bg-white">
                    <p className="text-sm text-gray-500">Food to be shared:</p>
                    <p className="font-bold text-lg">{foodToShare?.name || 'No Food Selected'}</p>
                    <p className="text-sm text-gray-600">{foodToShare?.calories} Calories, {foodToShare?.portion}</p>
                </div>
                <div>
                    <label className="text-gray-600 mb-1 block">Caption</label>
                    <textarea placeholder="Write something about this food..." value={caption} onChange={e => setCaption(e.target.value)} className="w-full p-3 border rounded-lg h-24"></textarea>
                </div>
                <div>
                    <label className="text-gray-600 mb-1 block">Add Photo (Optional)</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <UploadIcon />
                        <p className="text-sm text-gray-500 mt-2">Upload file</p>
                    </div>
                </div>
                <div>
                    <label className="text-gray-600 mb-1 block">Share with</label>
                    <button onClick={() => setShareOptionsOpen(true)} className="w-full p-3 border rounded-lg bg-white text-left flex justify-between items-center">
                        <span>{getShareOptionText()}</span>
                        <span>▼</span>
                    </button>
                </div>
                <button onClick={handlePost} className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg mt-4">Share</button>
            </div>

            {isShareOptionsOpen && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-end" onClick={() => setShareOptionsOpen(false)}>
                    <div className="bg-white w-full rounded-t-2xl p-4" onClick={e => e.stopPropagation()}>
                        <h3 className="font-bold text-center mb-4">Siapa yang bisa melihat?</h3>
                        <button onClick={() => { setShareOption('Public'); setShareOptionsOpen(false); }} className="w-full text-left p-3 hover:bg-gray-100 rounded-lg">Publik</button>
                        <button onClick={() => { setShareOption('All Friends'); setShareOptionsOpen(false); }} className="w-full text-left p-3 hover:bg-gray-100 rounded-lg">Semua Teman</button>
                        <button onClick={() => { setShareOptionsOpen(false); setSelectFriendsOpen(true); }} className="w-full text-left p-3 hover:bg-gray-100 rounded-lg">Teman Tertentu...</button>
                    </div>
                </div>
            )}

            {isSelectFriendsOpen && <SelectFriendsModal onClose={() => setSelectFriendsOpen(false)} />}
        </div>
    );
};

const SettingsScreen = ({ onNavigate }) => {
    const SettingItem = ({ children, icon, onClick }) => (
        <button onClick={onClick} className="w-full text-left p-4 flex items-center bg-white rounded-lg shadow-sm">
            <div className="mr-4">{icon}</div>
            <span className="flex-grow text-gray-700 font-semibold">{children}</span>
            <ChevronRightIcon />
        </button>
    );

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Settings</h1>
            </div>
            <div className="flex-grow overflow-y-auto px-6 space-y-4">
                <SettingItem icon={<TargetIcon />} onClick={() => onNavigate('targets')}>Set Calorie & Macro Targets</SettingItem>
                <SettingItem icon={<BellIcon />} onClick={() => onNavigate('reminders')}>Meal Reminders</SettingItem>
                <SettingItem icon={<ClockIcon />} onClick={() => onNavigate('scheduling')}>Repeat Items</SettingItem>
                <SettingItem icon={<BookmarkIcon />} onClick={() => onNavigate('bookmarks')}>Saved Posts</SettingItem>
                
                <div className="pt-8">
                     <button onClick={() => onNavigate('login')} className="w-full text-center p-4 bg-white rounded-lg shadow-sm text-red-500 font-semibold">
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

const TargetsScreen = ({ onNavigate, userData, updateUserData }) => {
    const [calories, setCalories] = useState(userData.macros.carbs.target * 4 + userData.macros.protein.target * 4 + userData.macros.fat.target * 9);
    const [carbs, setCarbs] = useState(userData.macros.carbs.target);
    const [protein, setProtein] = useState(userData.macros.protein.target);
    const [fat, setFat] = useState(userData.macros.fat.target);

    const handleSave = () => {
        // Logika untuk menyimpan data baru
        onNavigate('settings');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 p-6 font-sans">
            <div className="flex items-center mb-6">
                <button onClick={() => onNavigate('settings')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <h1 className="text-xl font-bold text-center flex-grow">Calorie & Macro Targets</h1>
                <div className="w-6"></div>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="font-semibold text-gray-600">Daily Calories</label>
                    <input type="number" value={calories} onChange={e => setCalories(e.target.value)} className="w-full p-3 mt-1 border rounded-lg"/>
                </div>
                 <div>
                    <label className="font-semibold text-gray-600">Carbohydrates (g)</label>
                    <input type="number" value={carbs} onChange={e => setCarbs(e.target.value)} className="w-full p-3 mt-1 border rounded-lg"/>
                </div>
                 <div>
                    <label className="font-semibold text-gray-600">Protein (g)</label>
                    <input type="number" value={protein} onChange={e => setProtein(e.target.value)} className="w-full p-3 mt-1 border rounded-lg"/>
                </div>
                 <div>
                    <label className="font-semibold text-gray-600">Fat (g)</label>
                    <input type="number" value={fat} onChange={e => setFat(e.target.value)} className="w-full p-3 mt-1 border rounded-lg"/>
                </div>
            </div>
            <div className="mt-auto">
                <button onClick={handleSave} className="w-full bg-pink-500 text-white font-bold py-3 rounded-full text-lg shadow-md">Save Changes</button>
            </div>
        </div>
    );
};

const RemindersScreen = ({ onNavigate }) => {
    const [reminders, setReminders] = useState([
        { id: 1, name: 'Breakfast', time: '08:00 AM', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], enabled: true },
        { id: 2, name: 'Lunch', time: '01:00 PM', days: ['Everyday'], enabled: true },
        { id: 3, name: 'Dinner', time: '07:00 PM', days: ['Mon', 'Wed', 'Fri'], enabled: false },
    ]);

    const toggleReminder = (id) => {
        setReminders(reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 p-6 font-sans">
             <div className="flex items-center justify-between mb-6">
                <button onClick={() => onNavigate('settings')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <h1 className="text-xl font-bold text-center flex-grow">Meal Reminders</h1>
                <button className="p-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></button>
            </div>
            <div className="space-y-4">
                {reminders.map(reminder => (
                    <div key={reminder.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex-grow">
                            <p className="font-bold text-gray-800">{reminder.name}</p>
                            <p className="text-2xl font-light">{reminder.time}</p>
                            <p className="text-sm text-gray-500">{reminder.days.join(', ')}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" checked={reminder.enabled} onChange={() => toggleReminder(reminder.id)} className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SchedulingScreen = ({ onNavigate, onAddRepeatItem, repeatItems }) => {
    const [isPremium, setIsPremium] = useState(false);

    const toggleRepeatItem = (id) => {
        // This would be part of a larger state management solution
        console.log("Toggling item", id);
    };

     return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
             <div className="p-6 pb-0">
                <div className="flex items-center mb-6">
                    <button onClick={() => onNavigate('settings')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <h1 className="text-xl font-bold text-center flex-grow">Repeat Items</h1>
                    <div className="w-6"></div>
                </div>
                 <div className="flex items-center justify-center mb-4">
                    <span className="mr-3 text-sm font-medium text-gray-900">Regular User</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={isPremium} onChange={() => setIsPremium(!isPremium)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                    </label>
                    <span className="ml-3 text-sm font-medium text-gray-900">Premium User</span>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto px-6 py-4 relative">
                <div className={`absolute inset-0 flex flex-col items-center justify-center text-center p-6 transition-opacity duration-500 ${isPremium ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <LockIcon />
                    <h1 className="text-xl font-bold text-gray-800">Premium Feature</h1>
                    <p className="text-gray-500 mb-6">Automatically log your regular meals.</p>
                    <button className="w-full max-w-sm bg-pink-200 text-pink-700 font-bold py-4 rounded-lg shadow-md hover:bg-pink-300 transition-colors">
                        Unlock Now
                    </button>
                </div>
                
                 <div className={`transition-opacity duration-500 ${isPremium ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={() => onNavigate('addRepeatItem')} className="w-full bg-pink-500 text-white font-bold py-3 rounded-lg mb-6">Add Repeat Item</button>
                    <div className="space-y-4">
                        {repeatItems.map(item => (
                            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex-grow">
                                    <p className="font-bold">{item.name}</p>
                                    <p className="text-sm text-gray-500">{item.meal} • {item.days}</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" checked={item.enabled} onChange={() => toggleRepeatItem(item.id)} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AddRepeatItemScreen = ({ onNavigate, onAddRepeatItem, allFoods }) => {
    const [selectedFood, setSelectedFood] = useState(null);
    const [selectedMeal, setSelectedMeal] = useState('Breakfast');
    const [selectedDays, setSelectedDays] = useState([]);
    
    const mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    const handleDayToggle = (day) => {
        setSelectedDays(prev => 
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const handleSave = () => {
        if (!selectedFood || selectedDays.length === 0) {
            alert("Please select a food and at least one day.");
            return;
        }
        const newRepeatItem = {
            id: Date.now(),
            name: selectedFood.name,
            meal: selectedMeal,
            days: selectedDays.join(', '),
            enabled: true,
        };
        onAddRepeatItem(newRepeatItem);
        onNavigate('scheduling');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 p-6 font-sans">
            <div className="flex items-center mb-6">
                <button onClick={() => onNavigate('scheduling')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                <h1 className="text-xl font-bold text-center flex-grow">Add Repeat Item</h1>
                <div className="w-6"></div>
            </div>

            <div className="flex-grow overflow-y-auto space-y-6">
                <div>
                    <h3 className="font-bold mb-2">1. Select Food</h3>
                    <div className="bg-white p-2 rounded-lg h-40 overflow-y-auto border">
                        {allFoods.map(food => (
                            <button key={food.id} onClick={() => setSelectedFood(food)} className={`w-full text-left p-2 rounded-md ${selectedFood?.id === food.id ? 'bg-pink-100' : ''}`}>
                                {food.name}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-2">2. Select Meal</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {mealTypes.map(meal => (
                            <button key={meal} onClick={() => setSelectedMeal(meal)} className={`p-3 rounded-lg text-sm font-semibold ${selectedMeal === meal ? 'bg-pink-500 text-white' : 'bg-white border'}`}>
                                {meal}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-bold mb-2">3. Select Days</h3>
                     <div className="flex justify-between">
                        {daysOfWeek.map((day, index) => (
                            <button key={index} onClick={() => handleDayToggle(day)} className={`w-10 h-10 rounded-full font-bold ${selectedDays.includes(day) ? 'bg-pink-500 text-white' : 'bg-white border'}`}>
                                {day}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="mt-auto">
                <button onClick={handleSave} className="w-full bg-pink-500 text-white font-bold py-3 rounded-full text-lg shadow-md">Save Repeat Item</button>
            </div>
        </div>
    );
};


const BookmarksScreen = ({ onNavigate }) => {
    // Dummy data for saved posts
    const savedPosts = [
        { id: 2, name: 'Mike', handle: '@mikel', time: '1 day ago', action: 'Hit Daily Calorie Goal', details: ['7 day streak!', '2300 cal'], likes: 15, comments: 4, avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M' }
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6 pb-4">
                <div className="flex items-center">
                    <button onClick={() => onNavigate('settings')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <h1 className="text-xl font-bold text-center flex-grow">Saved Posts</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-6 py-4">
                {savedPosts.length > 0 ? (
                    <div className="space-y-4">
                        {savedPosts.map(item => (
                             <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm">
                                <div className="flex items-center mb-3">
                                    <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full mr-3" />
                                    <div>
                                        <p className="font-bold">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.handle} • {item.time}</p>
                                    </div>
                                </div>
                                <p className="font-semibold mb-2">{item.action}</p>
                                <div className="pl-4 border-l-2 border-pink-200">
                                    {item.details.map((detail, index) => (
                                        <p key={index} className="text-sm text-gray-600">{detail.startsWith('✓') ? detail : `✓ ${detail}`}</p>
                                    ))}
                                </div>
                                <div className="flex items-center text-gray-500 mt-3 text-sm">
                                    <span>❤️ {item.likes}</span>
                                    <span className="ml-4">💬 {item.comments}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-8">
                        <p>You haven't saved any posts yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ChallengeDetailScreen = ({ onNavigate }) => {
    const friends = [
        { name: 'Sarah Chen', avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=SC' },
        { name: 'Mike', avatar: 'https://placehold.co/100x100/e2e8f0/4a5568?text=M' },
        { name: 'You', avatar: 'https://placehold.co/100x100/f56565/ffffff?text=ME' },
    ];

    return (
        <div className="flex flex-col h-full bg-gray-50 font-sans">
            <div className="p-6 pb-0">
                 <div className="flex items-center mb-6">
                    <button onClick={() => onNavigate('friends')} className="p-2 -ml-2"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg></button>
                    <h1 className="text-xl font-bold text-center flex-grow">Challenge Detail</h1>
                    <div className="w-6"></div>
                </div>
            </div>
            <div className="flex-grow overflow-y-auto px-6 space-y-6">
                <div className="text-center">
                    <div className="inline-block p-4 bg-pink-100 rounded-full mb-2">
                        <FireIcon />
                    </div>
                    <h2 className="text-2xl font-bold">7-Day Sugar Detox</h2>
                    <p className="text-gray-500">Hindari tambahan gula & makanan proses.</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold mb-2">Aturan Main</h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Tidak ada minuman manis (soda, jus kotak).</li>
                        <li>Tidak ada permen, kue, atau dessert.</li>
                        <li>Baca label: hindari produk dengan "gula" di 5 bahan pertama.</li>
                        <li>Log semua makananmu setiap hari.</li>
                    </ul>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold mb-3">Teman yang Berpartisipasi (3)</h3>
                    <div className="flex -space-x-2">
                        {friends.map((friend, index) => (
                            <img key={index} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={friend.avatar} alt={friend.name} />
                        ))}
                    </div>
                </div>

                 <div className="bg-white p-4 rounded-xl shadow-sm">
                    <h3 className="font-bold mb-2">Hadiah</h3>
                    <p className="text-sm text-gray-600">Dapatkan badge <span className="font-bold text-pink-500">"Sugar-Free Champion"</span> dan 50 poin jika berhasil menyelesaikan tantangan!</p>
                </div>
            </div>
            <div className="p-6">
                <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-full text-lg shadow-md transition-colors">
                    Join Challenge
                </button>
            </div>
        </div>
    );
};


// --- Main App Component ---
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [foodToShare, setFoodToShare] = useState(null);
  const [repeatItems, setRepeatItems] = useState([
        { id: 1, name: 'Oatmeal', meal: 'Breakfast', days: 'Every weekday', enabled: true },
        { id: 2, name: 'Protein Shake', meal: 'Snacks', days: 'Mon, Wed, Fri', enabled: false },
    ]);
  const [userData, setUserData] = useState({
      goal: 'Fat Loss',
      weeklyTarget: 0.5,
      birthday: '24/07/1995',
      gender: 'Man',
      height: 175,
      weight: 75,
      goalWeight: 70,
      macros: { // Menambahkan data makro ke state pengguna
        carbs: { target: 250, consumed: 0 },
        protein: { target: 150, consumed: 0 },
        fat: { target: 67, consumed: 0 },
      }
  });
  const [loggedMeals, setLoggedMeals] = useState({});
  const [myFoods, setMyFoods] = useState([]);
  const [newFoodData, setNewFoodData] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const showToast = (message :string) => {
      setToastMessage(message);
      setTimeout(() => setToastMessage(''), 3000);
  };

  const updateUserData = (newData: Partial<UserData>) => {
      setUserData(prev => ({ ...prev, ...newData }));
  };
  
  const updateNewFoodData = (data: Partial<FoodItem>) => {
      setNewFoodData(prev => ({ ...prev, ...data }));
  };

  const handleCreateFood = (food) => {
      setMyFoods(prev => [...prev, food]);
  };

  const handleAddSharedFood = (food) => {
    const newFood = { ...food, id: Date.now() };
    setMyFoods(prev => [...prev, newFood]);
    showToast(`${food.name} added to My Food!`);
  };
  
  const handleAddRepeatItem = (newItem) => {
    setRepeatItems(prev => [...prev, newItem]);
  };

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  const handleDateChange = (offsetOrDate) => {
    if (typeof offsetOrDate === 'number') {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + offsetOrDate);
            return newDate;
        });
    } else {
        setCurrentDate(offsetOrDate);
    }
  };
  
  const handleLogFood = (foodItem, mealType, date) => {
      const dateKey = date.toISOString().split('T')[0];
      setLoggedMeals(prev => {
          const newMeals = { ...prev };
          if (!newMeals[dateKey]) {
              newMeals[dateKey] = {};
          }
          if (!newMeals[dateKey][mealType]) {
              newMeals[dateKey][mealType] = [];
          }
          newMeals[dateKey][mealType].push(foodItem);
          return newMeals;
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
        setIsModalOpen(false);
        handleNavigation('birthday');
    }, 800);
  };

  const screens = {
    splash: <SplashScreen onNavigate={handleNavigation} />,
    login: <LoginScreen onNavigate={handleNavigation} />,
    goal: <GoalScreen onNavigate={handleNavigation} updateUserData={updateUserData} />,
    weeklyTarget: <WeeklyTargetScreen onNavigate={handleNavigation} updateUserData={updateUserData} userData={userData} />,
    additionalGoals: <AdditionalGoalsScreen onNavigate={handleNavigation} openModal={openModal} />,
    birthday: <BirthdayScreen onNavigate={handleNavigation} updateUserData={updateUserData} />,
    gender: <GenderScreen onNavigate={handleNavigation} updateUserData={updateUserData} />,
    height: <HeightScreen onNavigate={handleNavigation} updateUserData={updateUserData} />,
    weight: <WeightScreen onNavigate={handleNavigation} updateUserData={updateUserData} />,
    goalWeight: <GoalWeightScreen onNavigate={handleNavigation} updateUserData={updateUserData} userData={userData} />,
    signUp: <SignUpScreen onNavigate={handleNavigation} />,
    home: <HomeScreen 
        onNavigate={handleNavigation} 
        userData={userData} 
        loggedMeals={loggedMeals}
        currentDate={currentDate}
        onDateChange={handleDateChange}
    />,
    logFood: <LogFoodScreen 
        onNavigate={handleNavigation}
        onLogFood={handleLogFood}
        date={currentDate}
        myFoods={myFoods}
    />,
    createFood: <CreateFoodScreen onNavigate={handleNavigation} updateNewFoodData={updateNewFoodData} />,
    createFoodDetail: <CreateFoodDetailScreen onNavigate={handleNavigation} newFoodData={newFoodData} onCreateFood={handleCreateFood} />,
    quickAdd: <QuickAddScreen onNavigate={handleNavigation} onLogFood={handleLogFood} date={currentDate} />,
    shareFood: <ShareFoodScreen onNavigate={handleNavigation} allFoods={[...foodDatabase, ...myFoods]} setFoodToShare={setFoodToShare} />,
    createPost: <CreatePostScreen onNavigate={handleNavigation} foodToShare={foodToShare} showToast={showToast} />,
    premiumMacros: <PremiumMacrosScreen onNavigate={handleNavigation} userData={userData} />,
    progress: <ProgressScreen onNavigate={handleNavigation} userData={userData} updateUserData={updateUserData} />,
    friends: <FriendsScreen onNavigate={handleNavigation} onAddSharedFood={handleAddSharedFood} />,
    settings: <SettingsScreen onNavigate={handleNavigation} />,
    targets: <TargetsScreen onNavigate={handleNavigation} userData={userData} updateUserData={updateUserData} />,
    reminders: <RemindersScreen onNavigate={handleNavigation} />,
    scheduling: <SchedulingScreen onNavigate={handleNavigation} onAddRepeatItem={handleAddRepeatItem} repeatItems={repeatItems} />,
    addRepeatItem: <AddRepeatItemScreen onNavigate={handleNavigation} onAddRepeatItem={handleAddRepeatItem} allFoods={[...foodDatabase, ...myFoods]} />,
    bookmarks: <BookmarksScreen onNavigate={handleNavigation} />,
    challengeDetail: <ChallengeDetailScreen onNavigate={handleNavigation} />,
  };

  const showNav = ['home', 'progress', 'friends', 'settings'].includes(currentScreen);

  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-sm h-[844px] bg-white rounded-[40px] shadow-2xl border-8 border-black overflow-hidden relative flex flex-col">
            <style>{`
                .hide-arrows::-webkit-outer-spin-button,
                .hide-arrows::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
                .hide-arrows { -moz-appearance: textfield; }
            `}</style>
            
            <div className="flex-grow overflow-y-auto">
                {screens[currentScreen]}
            </div>
            
            {showNav && <BottomNav activeScreen={currentScreen} onNavigate={handleNavigation} />}
            
            {isModalOpen && (
                <Modal onClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Thanks for sharing your goals!</h2>
                    <p className="text-gray-600">We're excited to support you on this journey.</p>
                </Modal>
            )}

            {toastMessage && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm">
                    {toastMessage}
                </div>
            )}
        </div>
    </div>
  );
}
