import { getSubdomainUser } from "./server";

export const instant = false;

export default async function SubdomainPage({ params }: PageProps<"/s/[subdomain]">) {
  const subdomain = (await params).subdomain;

  const user = await getSubdomainUser(subdomain);

  return (
    <p>
      {user.name} <span className="block">{user.email}</span>
    </p>
  );
}
