import { useEffect, useState } from "react";
import { getUsers } from "../../api/user-api";
import { DataGrid } from "@mui/x-data-grid";

export const UserTable = ({ refreshUsers }: { refreshUsers: number }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const users = await getUsers();
            setUsers(users);
        };
        fetchUsers();
    }, [refreshUsers]);

    const columns = [
        { field: 'firstName', headerName: 'First Name', width: 180 , },
        { field: 'lastName', headerName: 'Last Name', width: 180 },
        { field: 'email', headerName: 'Email', width: 250 }
    ];

    return (    
        <DataGrid className="dataGrid"
            disableColumnResize={true}
            rows={users}
            columns={columns}
            getRowId={(row: any) => row._id}
        />
    )
}