import React, {useEffect, useState} from "react";
import moment from "moment";
import mockData from "./mockData.json";

export default function Form() {
    // const {components, data, onChange} = useDynamicForm(
    //     formConfig,
    //     initialValues
    // );
    const [formConfig, setFormConfig] = useState();
    const [formData, setFormData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        // Simulate an API call
        setTimeout(() => {
            setFormConfig(mockData);
            setFormData(mockData.data);
            setLoading(false)
        }, 2000);
    }, []);



    const handleChange = (formId, path, e) => {
        const data = {...formData};
        let newValue = e.target.value;
        data[formId][path] = newValue;
        setFormData(data);
    };

    const submitForm = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        loading ? <p>Loading....</p> : Object.entries(formConfig.view).map(([formId, form]) => {

                return <form key={formId}>
                    <h1>{form.title}</h1>
                    {Object.entries(form.children).map(([elementId, comp]) => {
                        const currentData = formData[formId];
                        switch ((comp.component)) {
                            case 'Text':
                                return (
                                    <div key={elementId}>
                                        <label>{comp.label}</label>
                                        <input
                                            name={comp.name}
                                            value={currentData.employee__name}
                                            onChange={(e) => {
                                                handleChange(formId, comp.path, e)
                                            }}
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
                                            onChange={(e) => {
                                                handleChange(formId, comp.path, e)
                                            }}
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
                    })}
                    <button onClick={submitForm}>Submit</button>
                </form>
            }
        )
    );
}
