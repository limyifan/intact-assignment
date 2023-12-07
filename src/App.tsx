// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
import moment from "moment";
// @ts-ignore
import mockData from "./mockData.json";
import {FormData, FormView, IData, IForm} from "./interface";

export default function Form() {
    const [formConfig, setFormConfig] = useState<IForm>();
    const [formData, setFormData] = useState<FormData>();
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        // Simulate an API call
        setTimeout(() => {
            setFormConfig(mockData);
            setFormData(mockData.data);
            setLoading(false)
        }, 2000);
    }, []);



    /**
     * Handles change in form input value and updates the form data state.
     * @param {string} formId - The unique identifier of the form.
     * @param {string} path - The path to the specific form field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the change in input value.
     */
    const handleChange = (formId:string, path:string, e: React.ChangeEvent<HTMLInputElement>) => {
        const data = {...formData};
        let newValue = e.target.value;
        data[formId][path] = newValue;
        setFormData(data);
    };
    const renderFormElements = (formId: string, form: FormView) => {
        const currentData: IData = formData[formId];
        return Object.entries(form.children).map(([elementId, comp]) => {
            switch (comp.component) {
                case 'Text':
                    return (
                        <div key={elementId}>
                            <label>{comp.label}</label>
                            <input
                                name={comp.name}
                                value={currentData.employee__name}
                                onChange={(e) => { handleChange(formId, comp.path, e) }}
                            />
                        </div>
                    );
                case 'Date':
                    const date = moment(currentData.date).format('YYYY-MM-DD');
                    return (
                        <div key={elementId}>
                            <label>{comp.label}</label>
                            <input
                                type="date"
                                name={comp.name}
                                value={date}
                                onChange={(e) => { handleChange(formId, comp.path, e) }}
                            />
                        </div>
                    );
                case 'Command':
                    return (
                        <button key={elementId}>{comp.text}</button>
                    );
                default:
                    return null;
            }
        });
    };

    if(loading) return <p>Loading...</p>

    return (
        //loop through the form view to generate different employee forms
        Object.entries(formConfig.view).map(([formId, form]) => (
            <form key={formId}>
                <h1>{form.title}</h1>
                {renderFormElements(formId, form)}
            </form>
        )
        )
    );
}
