import { TodosResponse } from "../../services/todoApi";
import { statusColors } from "../CreateTodoForm/CreateTodoForm";

function StatusCounts({ data }: { data: TodosResponse | undefined }) {
  if (!data?.statusCount) return null;

  return (
    <div className="status-countes" style={{}}>
      {Object.entries(data?.statusCount).map(([status, count]) => (
        <div
          key={status}
          className="status-count"
          style={{
            backgroundColor: statusColors[status as keyof typeof statusColors],
            borderColor: statusColors[status as keyof typeof statusColors],
          }}
        >
          <span>{status}</span>
          <span>{count}</span>
        </div>
      ))}
    </div>
  );
}

export default StatusCounts;
