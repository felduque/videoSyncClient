interface UserListProps {
    users: string[]
  }
  
  export default function UserList({ users }: UserListProps) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="mb-2 font-semibold text-xl">Connected Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index} className="mb-1">
              {user}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  
  