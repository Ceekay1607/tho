import React, { useEffect, useRef, useState } from "react";
import {
    Users,
    Clock,
    BarChart3,
    MessageSquare,
    Search,
    Menu,
    X,
    Mail,
    CheckCircle,
    TrendingUp,
    DollarSign,
    UserPlus,
    Send,
} from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    AreaChart,
    Area,
} from "recharts";

const USERS_DATA = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "vana@example.com",
        role: "Học viên",
        status: "Active",
        date: "2023-10-01",
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "thib@example.com",
        role: "Giảng viên",
        status: "Active",
        date: "2023-09-15",
    },
    {
        id: 3,
        name: "Lê Văn C",
        email: "vanc@example.com",
        role: "Học viên",
        status: "Inactive",
        date: "2023-11-20",
    },
    {
        id: 4,
        name: "Phạm Thị D",
        email: "thid@example.com",
        role: "Học viên",
        status: "Active",
        date: "2023-10-05",
    },
    {
        id: 5,
        name: "Hoàng Văn E",
        email: "vane@example.com",
        role: "Quản lý",
        status: "Active",
        date: "2023-08-10",
    },
    {
        id: 6,
        name: "Đặng Thị F",
        email: "thif@example.com",
        role: "Học viên",
        status: "Inactive",
        date: "2023-12-01",
    },
];

const OVERDUE_USERS = [
    {
        id: 101,
        name: "Ngô Văn G",
        email: "vang@example.com",
        course: "Lập trình React",
        daysLate: 5,
        fee: "5.000.000 VNĐ",
    },
    {
        id: 102,
        name: "Bùi Thị H",
        email: "thih@example.com",
        course: "Tiếng Anh B1",
        daysLate: 12,
        fee: "3.500.000 VNĐ",
    },
    {
        id: 103,
        name: "Đỗ Văn I",
        email: "vani@example.com",
        course: "Data Science",
        daysLate: 2,
        fee: "8.000.000 VNĐ",
    },
    {
        id: 104,
        name: "Lý Thị K",
        email: "thik@example.com",
        course: "Design UI/UX",
        daysLate: 20,
        fee: "4.200.000 VNĐ",
    },
];

const REVENUE_DATA = [
    { name: "T1", revenue: 4000, students: 24 },
    { name: "T2", revenue: 3000, students: 18 },
    { name: "T3", revenue: 2000, students: 15 },
    { name: "T4", revenue: 2780, students: 20 },
    { name: "T5", revenue: 1890, students: 12 },
    { name: "T6", revenue: 2390, students: 16 },
    { name: "T7", revenue: 3490, students: 28 },
    { name: "T8", revenue: 4200, students: 35 },
    { name: "T9", revenue: 5100, students: 45 },
    { name: "T10", revenue: 4800, students: 40 },
    { name: "T11", revenue: 5600, students: 50 },
    { name: "T12", revenue: 6200, students: 60 },
];

type TabId = "users" | "overdue" | "revenue" | "chat";
type ChatMessage = { id: number; text: string; sender: "agent" | "user" };

interface SidebarProps {
    activeTab: TabId;
    setActiveTab: (tab: TabId) => void;
    isMobileOpen: boolean;
    toggleMobile: () => void;
}

const Sidebar = ({
    activeTab,
    setActiveTab,
    isMobileOpen,
    toggleMobile,
}: SidebarProps) => {
    const menuItems: { id: TabId; label: string; icon: typeof Users }[] = [
        { id: "users", label: "Quản lý User", icon: Users },
        { id: "overdue", label: "Học viên Trễ hạn", icon: Clock },
        { id: "revenue", label: "Thống kê Doanh thu", icon: BarChart3 },
        { id: "chat", label: "Chat với Agent", icon: MessageSquare },
    ];

    return (
        <div
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            } md:relative md:translate-x-0`}
        >
            <div className="flex items-center justify-between h-16 px-6 bg-slate-800">
                <span className="text-xl font-bold text-blue-400">
                    EduManager
                </span>
                <button onClick={toggleMobile} className="md:hidden">
                    <X size={24} />
                </button>
            </div>
            <div className="p-4">
                <div className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                if (window.innerWidth < 768) toggleMobile();
                            }}
                            className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors rounded-lg ${
                                activeTab === item.id
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                            }`}
                        >
                            <item.icon size={20} className="mr-3" />
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 w-full p-4 bg-slate-800">
                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                        AD
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium">Admin User</p>
                        <p className="text-xs text-slate-400">
                            admin@school.edu
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserManagement = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = USERS_DATA.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-800">
                    Danh sách Người dùng
                </h2>
                <div className="relative w-full sm:w-64">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />
                    <input
                        type="text"
                        placeholder="Tìm kiếm..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Tên</th>
                                <th className="px-6 py-4">Vai trò</th>
                                <th className="px-6 py-4">Trạng thái</th>
                                <th className="px-6 py-4">Ngày tham gia</th>
                                <th className="px-6 py-4">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">
                                                {user.name}
                                            </span>
                                            <span className="text-slate-500 text-xs">
                                                {user.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {user.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                user.status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">
                                        {user.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                                            Sửa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        Không tìm thấy kết quả nào.
                    </div>
                )}
            </div>
        </div>
    );
};

const OverdueRegistration = () => {
    const [sendingMap, setSendingMap] = useState<
        Record<number, "sending" | "sent">
    >({});

    const handleSendMail = (id: number) => {
        setSendingMap((prev) => ({ ...prev, [id]: "sending" }));

        setTimeout(() => {
            setSendingMap((prev) => ({ ...prev, [id]: "sent" }));
            setTimeout(() => {
                setSendingMap((prev) => {
                    const { [id]: _omit, ...rest } = prev;
                    return rest;
                });
            }, 3000);
        }, 1500);
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">
                Học viên Trễ hạn / Chưa đóng phí
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {OVERDUE_USERS.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-800">
                                        {user.name}
                                    </h3>
                                    <p className="text-sm text-slate-500">
                                        {user.email}
                                    </p>
                                </div>
                                <div className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                                    Trễ {user.daysLate} ngày
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        Khóa học:
                                    </span>
                                    <span className="font-medium text-slate-800">
                                        {user.course}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">
                                        Số tiền nợ:
                                    </span>
                                    <span className="font-bold text-red-600">
                                        {user.fee}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => handleSendMail(user.id)}
                            disabled={
                                sendingMap[user.id] === "sending" ||
                                sendingMap[user.id] === "sent"
                            }
                            className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all ${
                                sendingMap[user.id] === "sent"
                                    ? "bg-green-500 text-white"
                                    : sendingMap[user.id] === "sending"
                                    ? "bg-blue-300 text-white cursor-wait"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                        >
                            {sendingMap[user.id] === "sending" ? (
                                <span>Đang gửi...</span>
                            ) : sendingMap[user.id] === "sent" ? (
                                <>
                                    <CheckCircle size={18} />
                                    <span>Đã gửi nhắc nhở</span>
                                </>
                            ) : (
                                <>
                                    <Mail size={18} />
                                    <span>Gửi Email Nhắc Nhở</span>
                                </>
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RevenueStats = () => (
    <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-slate-800">
            Thống kê Doanh thu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">
                            Tổng doanh thu (Năm)
                        </p>
                        <h3 className="text-2xl font-bold text-slate-800">
                            1.2 Tỷ VNĐ
                        </h3>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                        <UserPlus size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">
                            Học viên mới (Tháng)
                        </p>
                        <h3 className="text-2xl font-bold text-slate-800">
                            124
                        </h3>
                    </div>
                </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Tăng trưởng</p>
                        <h3 className="text-2xl font-bold text-slate-800">
                            +18.2%
                        </h3>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Biểu đồ Doanh thu (Triệu VNĐ)
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={REVENUE_DATA}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "none",
                                    boxShadow:
                                        "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                    Số lượng học viên đăng ký
                </h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={REVENUE_DATA}>
                            <defs>
                                <linearGradient
                                    id="colorStudents"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#fff",
                                    borderRadius: "8px",
                                    border: "none",
                                    boxShadow:
                                        "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="students"
                                stroke="#8884d8"
                                fillOpacity={1}
                                fill="url(#colorStudents)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
);

const ChatAgent = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            text: "Xin chào! Tôi là trợ lý ảo của hệ thống trường học. Tôi có thể giúp gì cho bạn hôm nay?",
            sender: "agent",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!input.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now(),
            text: input,
            sender: "user",
        };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            let replyText =
                "Tôi đã ghi nhận yêu cầu của bạn. Bạn cần hỗ trợ gì thêm không?";
            const lowerInput = userMsg.text.toLowerCase();

            if (
                lowerInput.includes("doanh thu") ||
                lowerInput.includes("tiền")
            ) {
                replyText =
                    "Bạn có thể xem chi tiết tại trang 'Thống kê Doanh thu'. Hiện tại doanh thu tháng này đang tăng 18%.";
            } else if (
                lowerInput.includes("học viên") ||
                lowerInput.includes("user")
            ) {
                replyText =
                    "Bạn có thể quản lý học viên tại trang 'Quản lý User'.";
            } else if (
                lowerInput.includes("chào") ||
                lowerInput.includes("hi")
            ) {
                replyText = "Chào bạn! Chúc bạn một ngày làm việc hiệu quả.";
            }

            const agentMsg: ChatMessage = {
                id: Date.now() + 1,
                text: replyText,
                sender: "agent",
            };
            setMessages((prev) => [...prev, agentMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] md:h-screen bg-slate-50">
            <div className="p-4 bg-white border-b border-slate-200 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <MessageSquare className="text-indigo-600" size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-slate-800">Hỗ trợ viên AI</h2>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />{" "}
                        Online
                    </p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${
                            msg.sender === "user"
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <div
                            className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl text-sm ${
                                msg.sender === "user"
                                    ? "bg-blue-600 text-white rounded-tr-none"
                                    : "bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none"
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

const App = () => {
    const [activeTab, setActiveTab] = useState<TabId>("users");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleMobile = () => setIsMobileOpen((prev) => !prev);

    const renderContent = () => {
        switch (activeTab) {
            case "users":
                return <UserManagement />;
            case "overdue":
                return <OverdueRegistration />;
            case "revenue":
                return <RevenueStats />;
            case "chat":
                return <ChatAgent />;
            default:
                return <UserManagement />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobileOpen={isMobileOpen}
                toggleMobile={toggleMobile}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <div className="md:hidden flex items-center justify-between bg-white border-b border-slate-200 p-4">
                    <span className="font-bold text-slate-800">Dashboard</span>
                    <button onClick={toggleMobile} className="text-slate-600">
                        <Menu size={24} />
                    </button>
                </div>

                <main
                    className={`flex-1 overflow-y-auto ${
                        activeTab === "chat" ? "p-0" : ""
                    }`}
                >
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
