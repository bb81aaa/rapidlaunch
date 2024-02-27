import {
    ActivitySquareIcon,
    BellIcon,
    BookTextIcon,
    CheckSquare2Icon,
    DatabaseIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListChecksIcon,
    PenLineIcon,
    PlusCircleIcon,
    SettingsIcon,
    UsersRoundIcon,
} from "lucide-react";
import { siteUrls } from "@/config/urls";

/**
 * This file contains the configuration for the navigation items in the sidebar
 * to add a new navigation item, you can add a new object to the navigation array
 * 1 id: a unique id for the navigation, add it to the navIds object
 * 2 label: the label for the navigation (it's a category label)
 * 3 showLabel: if true, the label will be shown in the sidebar (it's a category label)
 * 4 items: an array of navigation items
 *   - label: the label for the navigation item
 *   - icon: the icon for the navigation item
 *   - href: the href for the navigation item
 *   - subMenu: an array of subMenu items
 *     > label: the label for the subMenu item
 *     > href: the href for the subMenu item
 *     > icon: the icon for the subMenu item
 *
 * @use specific navigation items in the sidebar, you can use the filterNavItems function
 */

type IconProps = React.HTMLAttributes<SVGElement>;

type NavItemBase = {
    label: string;
    icon: React.ComponentType<IconProps>;
    disabled?: boolean;
};

type NavItemWithHref = NavItemBase & {
    href: string;
    subMenu?: never;
};

type NavItemWithSubMenu = NavItemBase & {
    href?: never;
    subMenu: {
        label: string;
        href: string;
        icon: React.ComponentType<IconProps>;
        disabled?: boolean;
    }[];
};

type NavItem = NavItemWithHref | NavItemWithSubMenu;

export type SidebarNavItems = {
    id: string;
    label: string;
    showLabel?: boolean;
    items: NavItem[];
};

const navIds = {
    admin: "admin",
    general: "general",
    resources: "resources",
};

const navigation: SidebarNavItems[] = [
    {
        id: navIds.admin,
        label: "Admin",
        showLabel: true,
        items: [
            {
                label: "Dashboard",
                icon: LayoutDashboardIcon,
                href: siteUrls.admin.dashboard,
            },
            {
                label: "Users",
                icon: UsersRoundIcon,
                href: siteUrls.admin.users,
            },
            {
                label: "Blog",
                icon: PenLineIcon,
                href: siteUrls.admin.blog,
            },
            {
                label: "Application Settings",
                icon: SettingsIcon,
                href: siteUrls.admin.settings,
            },
            {
                label: "Feedback List",
                icon: HelpCircleIcon,
                href: siteUrls.admin.feedback,
            },
        ],
    },
    {
        id: navIds.general,
        label: "General",
        showLabel: true,
        items: [
            {
                label: "Dashboard",
                icon: LayoutDashboardIcon,
                href: siteUrls.dashboard.home,
            },
            {
                label: "Projects",
                icon: ActivitySquareIcon,
                subMenu: [
                    {
                        label: "See Projects",
                        href: siteUrls.dashboard.projects.home,
                        icon: ListChecksIcon,
                    },
                    {
                        label: "Create Project",
                        href: siteUrls.dashboard.projects.new,
                        icon: PlusCircleIcon,
                    },
                ],
            },
            {
                label: "Tasks",
                icon: CheckSquare2Icon,
                subMenu: [
                    {
                        label: "See Tasks",
                        href: siteUrls.dashboard.tasks.home,
                        icon: ListChecksIcon,
                    },
                    {
                        label: "Create Task",
                        href: siteUrls.dashboard.tasks.new,
                        icon: PlusCircleIcon,
                    },
                ],
            },
            {
                label: "Database",
                icon: DatabaseIcon,
                href: siteUrls.dashboard.database,
            },
            {
                label: "Team",
                icon: UsersRoundIcon,
                href: siteUrls.dashboard.team,
            },
            {
                label: "Notifications",
                icon: BellIcon,
                href: siteUrls.dashboard.notifications,
            },
        ],
    },
    {
        id: navIds.resources,
        label: "Resources",
        showLabel: true,
        items: [
            {
                label: "Docs",
                icon: BookTextIcon,
                href: siteUrls.docs.home,
            },
            {
                label: "Blog",
                icon: PenLineIcon,
                href: siteUrls.blog,
            },
            {
                label: "Support",
                icon: HelpCircleIcon,
                href: siteUrls.support,
            },
        ],
    },
];

type FilterNavItemsProps = {
    removeIds?: string[];
    includedIds?: string[];
};

/**
 * @purpose Filters the navigation items for the sidebar.
 * The filterNavItems function filters the navigation items for the sidebar.
 * @param removeIds An array of string identifiers to remove from the navigation items.
 * @param includeIds An array of string identifiers to include in the navigation items.
 *
 * @returns The filtered navigation items for the sidebar.
 * */

export function filterNavItems({
    removeIds = [],
    includedIds = [],
}: FilterNavItemsProps) {
    let includedItems = sidebarConfig.navigation;

    if (includedIds.length) {
        includedItems = includedItems.filter((item) =>
            includedIds.includes(item.id),
        );
    }

    if (removeIds.length) {
        includedItems = includedItems.filter(
            (item) => !removeIds.includes(item.id),
        );
    }

    return includedItems;
}

/**
 * The sidebarConfig is an object that contains the configuration for the dashboard
 * @export all the configuration for the sidebar in sidebarConfig
 */

export const sidebarConfig = {
    navIds,
    navigation,
    filterNavItems,
} as const;