import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { axiosInstance, getUsersData } from '../../../../services/urls';
import { UserListType } from '../../../../services/interfaces';
import CustomTable from '../../../Shared/Components/CustomTable/CustomTable';
import {
	StyledTableCell,
	StyledTableRow,
} from '../../../../helperStyles/helperStyles';
import { PaginationOptions } from '../../../../interfaces/PaginationInterfaces';
import NoData from '../../../Shared/Components/NoData/NoData';
import DashboardHeading from '../../../Shared/Components/DashboardHeading/DashboardHeading';

export default function UsersList() {
	const [usersData, setUsersData] = useState([]);
	const [totalCount, setTotalCount] = useState(0);
	const [loading, setLoading] = useState(false);

  const getUsers = async ({ size, page }: PaginationOptions) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(getUsersData, {
        params: { size, page },
      });
      console.log(response.data.data);
      setUsersData(response.data?.data?.users);
      setTotalCount(response.data?.data?.totalCount);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers({ size: 5, page: 1 });
  }, []);

	const usersList = usersData?.map((user: UserListType) => (
		<StyledTableRow key={user._id}>
			<StyledTableCell align='center'>{user.userName}</StyledTableCell>
			<StyledTableCell align='center'>{user.email}</StyledTableCell>
			<StyledTableCell align='center'>{user.phoneNumber}</StyledTableCell>
			<StyledTableCell align='center'>{user.country}</StyledTableCell>
			<StyledTableCell align='center'>{user.role}</StyledTableCell>
		</StyledTableRow>
	));

  return (
    <>
      <DashboardHeading label="Users" item="User" />

      <CustomTable
      loading={loading}
        columnTitles={["Username", "Email", "Phone number", "Country", "Role"]}
        count={totalCount}
        getListFn={getUsers}
      >
      
        { !loading && usersData.length > 0 ? (
          usersList
        ) : (
         !loading && <NoData />
        )}
      </CustomTable>
    </>
  );
}
