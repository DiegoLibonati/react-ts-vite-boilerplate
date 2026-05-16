interface DefaultProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LinkProps extends DefaultProps {
  id: string;
  href: string;
  ariaLabel: string;
  target?: string;
}

export interface ActionProps extends DefaultProps {
  id: string;
  ariaLabel: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export interface UserCardProps extends DefaultProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface CounterProviderProps {
  children: React.ReactNode;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
