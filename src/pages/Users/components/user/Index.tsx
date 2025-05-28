type UserProps = {
  id: string;
  email?: string;
  created_at: string;
  name?: string;
};

export default function User({ email, id, created_at, name }: UserProps) {
  const date = new Date(created_at);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className="user__list__item">
      <img
        className="user__img"
        src={`https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/user-photos//${id}.jpg`}
        alt="user photo"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://ufcfeqrveeyzpruffbba.supabase.co/storage/v1/object/public/user-photos//default-avatar.jpg";
        }}
      />
      <div className="user__list__name">{name}</div>
      <div className="user__list__name">{email}</div>
      <div className="user__list__name">{formattedDate}</div>
    </div>
  );
}
