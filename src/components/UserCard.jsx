import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  return (
    <Link to={`/user/${user.username}`}>
      <div className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition">
        <img
          src={user.avatar?.url || "/avatar.png"}
          alt={user.username}
          className="w-25 h-25 rounded-full object-cover"
        />

        <div className="flex flex-col flex-1">
          <div className="font-semibold text-3xl">{user.fullname}</div>

          <div className="text-md text-muted-foreground">@{user.username}</div>

          <div className="flex gap-2 mt-3">
            <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary">
              {user.isAuthor ? "⦿ Author" : "⦿ User"}
            </span>

            <span
              className={`text-xs px-2 py-0.5 rounded 
            ${user.isActive ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}
          `}
            >
              {user.isActive ? "⦿ Active" : "⦿ Inactive"}
            </span>
          </div>

          <div className="text-md text-muted-foreground mt-3">
            {user.blogCount} blogs published
          </div>
        </div>
      </div>
    </Link>
  );
}
