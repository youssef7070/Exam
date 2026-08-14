export interface BreadcrumbItem {
    label: string;
    link?: string | any[];
    queryParams?: Record<string, string>;
}