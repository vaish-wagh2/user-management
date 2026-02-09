import { User } from "../types/User";

export interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  onCreate: () => void;
}

export default function UserList({
  users,
  onEdit,
  onDelete,
  onCreate
}: UserListProps) {
  const getAvatarColor = (firstName: string) => {
    const colors = [
      "bg-primary",
      "bg-success",
      "bg-info",
      "bg-warning",
      "bg-danger",
      "bg-secondary"
    ];
    return colors[firstName.charCodeAt(0) % colors.length];
  };

  return (
    <div className="card shadow-lg border-0 rounded-3 overflow-hidden">
      <div className="card-header bg-white  d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">User Management</h5>

        <button
          className="btn btn-outline-success btn-sm"
          onClick={onCreate}
        >
          <i className="bi bi-plus-circle me-1"></i>
          Create User
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-dark">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th className="text-center" style={{ width: 120 }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted py-4">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div className="d-flex align-items-center gap-2">
                      <div
                        className={`rounded-circle text-white fw-bold d-flex align-items-center justify-content-center ${getAvatarColor(
                          u.firstName
                        )}`}
                        style={{ width: 36, height: 36 }}
                      >
                        {u.firstName[0].toUpperCase()}
                      </div>
                      {u.firstName} {u.lastName}
                    </div>
                  </td>

                  <td>{u.phone}</td>

                  <td>
                    <a href={`mailto:${u.email}`}>
                      {u.email}
                    </a>
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => onEdit(u)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(u.id!)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
