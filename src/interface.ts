export interface FormView {
    id: string;
    title: string;
    children: FormComponents;
}

export interface FormComponents {
    [key: string]: childrenComponent;
}

export type FormComponentType = "Text" | "Date" | "Command";

export interface childrenComponent {
    id: string;
    component: FormComponentType;
    label: string | null;
    name: string | null;
    path: string | null;
    text: string | null;
}

export interface FormData {
    [key: string]: IData;
}

export interface IData {
    date: string;
    employee__name: string;
}

export interface IForm {
    view: {
        [key: string]: FormView;
    };
    data: {
        [key: string]: FormData;
    };
}
