import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";

function EditNote() {
  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  // This useGetNotesQuery() does note make any network request, it gets data from redux store only here
  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  // This useGetUsersQuery() does note make any network request, it gets data from redux store only here
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users.length) return <PulseLoader color="#fff" />;

  if (!isManager || !isAdmin) {
    if (note.username === username) {
      return <p className="errmsg">No Access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;
  return content;
}

export default EditNote;
