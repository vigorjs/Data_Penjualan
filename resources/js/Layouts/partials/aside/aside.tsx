import React, { PropsWithChildren } from 'react';

import { InertiaLinkProps, Link, router, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { BarChartBigIcon, ChevronDownCircleIcon, GlobeIcon, LayoutDashboardIcon, LogOutIcon, MessageCircleQuestionIcon, Settings2Icon } from 'lucide-react';
import { PageProps } from '@/types';

export function Aside() {
    const { auth, role } = usePage<PageProps>().props;
    return (
        <nav className='lg:flex hidden items-start min-h-screen border-r w-80 p-8 shrink-0'>
            <ul className='flex gap-y-1 flex-col w-full sticky top-12'>
                <li className='flex items-center justify-between mb-8'>
                    <Link href='/' className='block'>
                        <ApplicationLogo className='h-10 w-auto fill-red-600' />
                    </Link>
                </li>
                <AsideLink active={route().current('dashboard')} href={route('dashboard')}>
                    <LayoutDashboardIcon />
                    <span>Dashboard</span>
                </AsideLink>
                {role === 'admin' &&
                <AsideLink active={route().current('dataPenjualan.index')} href={route('dataPenjualan.index')}>
                    <BarChartBigIcon />
                    <span>Data Penjualan</span>
                </AsideLink>
                }
                <AsideLink active={route().current('profile.edit')} href={route('profile.edit')}>
                    <Settings2Icon />
                    <span>User Settings</span>
                </AsideLink>
                <li className='py-2'/>
                <AsideLink onClick={() => router.post(route('logout'))} href='/'>
                    <span>Log Out</span>
                </AsideLink>
            </ul>
        </nav>
    );
}

interface AsideLinkProps extends InertiaLinkProps {
    className?: string;
    active?: boolean;
}

export function AsideLink({ className, active, ...props }: AsideLinkProps) {
    return (
        <li className='-mx-4'>
            <Link
                className={cn(
                    active ? 'text-foreground font-semibold' : 'text-muted-foreground',
                    'flex items-center [&>svg]:w-4 [&>svg]:stroke-[1.25] [&>svg]:h-4 [&>svg]:mr-3 hover:bg-accent/50 tracking-tight text-sm hover:text-foreground px-4 py-2 rounded-md'
                )}
                {...props}
            />
        </li>
    );
}

export function AsideLabel({ children, className }: PropsWithChildren<{ className?: string }>) {
    return (
        <li className='-mx-4'>
            <span
                className={cn(
                    'flex items-center text-muted-foreground [&>svg]:w-4 [&>svg]:stroke-[1.25] [&>svg]:h-4 [&>svg]:mr-3 tracking-tight text-sm px-4 py-2 rounded-md',
                    className
                )}>
                {children}
            </span>
        </li>
    );
}
