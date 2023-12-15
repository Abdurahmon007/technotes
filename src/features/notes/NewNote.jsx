import React from "react";
import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

function NewNote() {
  // This useGetUsersQuery() does note make any network request, it gets data from redux store only here
  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color="#fff" />;

  const content = <NewNoteForm users={users} />;

  return content;
}

export default NewNote;
