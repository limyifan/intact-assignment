// @ts-ignore
import React, {useEffect, useState} from "react";
// @ts-ignore
import moment from "moment";
// @ts-ignore
import mockData from "../data/mockData.json";
import {FormData, FormView, IData, IForm} from "../interfaces/types";

export default function Form() {
    const [formConfig, setFormConfig] = useState<IForm>();
    const [formData, setFormData] = useState<FormData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate an API call
        setTimeout(() => {
            setFormConfig(mockData);
            setFormData(mockData.data);
            setLoading(false)
        }, 1500);
    }, []);

    /**
     * Handles change in form input value and updates the form data state.
     * @param {string} formId - The unique identifier of the form.
     * @param {string} path - The path to the specific form field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the change in input value.
     */
    const handleChange = (formId: string, path: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const data = {...formData};
        data[formId][path] = e.target.value;
        setFormData(data);
    };

    const renderFormElements = (formId: string, form: FormView) => {
        const currentData: IData = formData[formId];
        //loop through the children field to render form elements based on the provided form configuration.
        return Object.entries(form.children).map(([elementId, childComponent]) => {
            switch (childComponent.component) {
                case 'Text':
                    return (
                        <div key={elementId}>
                            <label>{childComponent.label}</label>
                            <input
                                name={childComponent.name}
                                value={currentData.employee__name}
                                onChange={(e) => {
                                    handleChange(formId, childComponent.path, e)
                                }}
                            />
                        </div>
                    );
                case 'Date':
                    const date = moment(currentData.date).format('YYYY-MM-DD');
                    return (
                        <div key={elementId}>
                            <label>{childComponent.label}</label>
                            <input
                                type="date"
                                name={childComponent.name}
                                value={date}
                                onChange={(e) => {
                                    handleChange(formId, childComponent.path, e)
                                }}
                            />
                        </div>
                    );
                case 'Command':
                    return (
                        <button key={elementId}>{childComponent.text}</button>
                    );
                default:
                    return null;
            }
        });
    };

    if (loading) return <p>Loading...</p>

    return (
        //loop through the form view to render different employee forms dynamically
        Object.entries(formConfig.view).map(([formId, formView]) => (
                <form key={formId}>
                    <h1>{formView.title}</h1>
                    {renderFormElements(formId, formView)}
                </form>
            )
        )
    );
}
