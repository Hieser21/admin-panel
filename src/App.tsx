import {useState} from 'react';
import { Refine } from "@pankod/refine-core";
import {
    notificationProvider,
    Layout,
    ConfigProvider,
    ErrorComponent,
    theme,
} from "@pankod/refine-antd";
import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider } from "@pankod/refine-supabase";
import authProvider from "./authProvider";
import { supabaseClient } from "utility";

import "@pankod/refine-antd/dist/reset.css";

import { UserList } from "./pages/user";
import { TaskList, TaskShow, TaskCreate, EditTask } from "./pages/task";
import { Dashboard } from "./pages/dashboard";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

interface HeaderProps {
    theme: "light" | "dark";
    setTheme: (theme: "light" | "dark") => void;
}
import Header from 'components/Header'


const App:React.FC = () => {
    const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");
    return (
        <ConfigProvider
        theme={{
            algorithm:
                currentTheme === "light"
                    ? theme.defaultAlgorithm
                    : theme.darkAlgorithm,
        }}
    >
        <Refine
            dataProvider={dataProvider(supabaseClient)}
            authProvider={authProvider}
            DashboardPage={Dashboard}
            LoginPage={Login}
            routerProvider={{
                ...routerProvider,
                routes: [
                    {
                        element: <Signup />,
                        path: "/signup",
                    },
                ] as typeof routerProvider.routes,
            }}
            Header={() => (
                <Header theme={currentTheme} setTheme={setCurrentTheme} />
            )}
            resources={[
                {
                    name: "users",
                    list: UserList,
                },
                {
                    name: "tasks",
                    list: TaskList,
                    edit: EditTask,
                    create: TaskCreate,
                    show: TaskShow,
                },
            ]}
            notificationProvider={notificationProvider}
            Layout={Layout}
            catchAll={<ErrorComponent />}
        />
        </ConfigProvider>
    );
}

export default App;
