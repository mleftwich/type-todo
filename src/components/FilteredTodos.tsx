import axios from "axios";
function FilteredTodos() {
  //// GET ALL THE USERS FROM THE API
  async function getUsers() {
    const req = await axios.get("api/users");
    const users = req.data;
  }

  
  return <h1>Filtered Todos</h1>;
}

export default FilteredTodos;
