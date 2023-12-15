import { useParams } from "react-router-dom";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

function EditUser() {
  const { id } = useParams();

  // This useGetUsersQuery() does note make any network request, it gets data from redux store only here
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[id],
    }),
  });

  if (!user) return <PulseLoader color="#fff" />;

  const content = <EditUserForm user={user} />;
  return content;
}

export default EditUser;
