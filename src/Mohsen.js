import React, { useState, useEffect } from 'react';
import { Form, TextField, SelectField } from './FormElements';
import * as Yup from 'yup';
import formSchema from "./Mohsen.json";



function Mohsen() {
    const [formData, setFormData] = useState({});
    const [validationSchema, setValidationSchema] = useState({});

    useEffect(() => {
        initForm(formSchema);
    }, []);

    const initForm = (formSchema) => {
        let _formData = {};
        let _validationSchema = {};

        for (var key of Object.keys(formSchema)) {
            if (formSchema[key].value) {
                _formData[key] = formSchema[key].value
            } else {
                _formData[key] = "";
            }

            if (formSchema[key].type === "text") {
                _validationSchema[key] = Yup.string();
            } else if (formSchema[key].type === "number") {
                _validationSchema[key] = Yup.number()
            } else if (formSchema[key].type === "select") {
                _validationSchema[key] = Yup.string().oneOf(formSchema[key].options.map(o => o.value));
            } else if (formSchema[key].type === "date") {
                _validationSchema[key] = Yup.string()
                    .test(dateString => 
                        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)/.test(dateString)
                    )
            }
            if (formSchema[key].required) {
                _validationSchema[key] = _validationSchema[key].required('Required');
            }
        }

        setFormData(_formData);
        setValidationSchema(Yup.object().shape({ ..._validationSchema }));
    }

    const getFormElement = (elementName, elementSchema) => {
        const props = {
            name: elementName,
            label: elementSchema.label,
            options: elementSchema.options
        };

        if (elementSchema.type === "text" || elementSchema.type === "number" || elementSchema.type === "date") {
            return <TextField {...props} />
        }

        if (elementSchema.type === "select") {
            return <SelectField  {...props} />
        }

    }

    const onSubmit = (values, { setSubmitting, resetForm, setStatus }) => {
        console.log(values);
        setSubmitting(false);
    }

    return (
        <div className="App">
            <Form
                enableReinitialize
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                
            >
                {Object.keys(formSchema).map((key, ind) => (
                    <div key={key}>
                        {getFormElement(key, formSchema[key])}
                    </div>
                ))}

            </Form>
        </div>
    );
}

export default Mohsen;