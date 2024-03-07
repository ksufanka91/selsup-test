import React, {FC} from "react";

interface Param {
    id: number;
    name: string;
    type?: 'number' | 'text';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    model: Model
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            model: props.model
        };
    }

    render() {
        const {params} = this.props;

        return (
            <form>
                {params.map(param => (
                    <label key={param.id}>
                        {param.name}

                        <ParamEditorField
                            param={param}
                            model={this.state.model}
                            setValue={(paramId, value) => this.setParamValue(paramId, value)}/>
                    </label>
                ))}
            </form>
        );
    }

    public getModel(): Model {
        return this.state.model;
    }

    protected setParamValue(paramId, value) {
        let {model} = this.state;

        model.paramValues = model.paramValues.map(modelValue => {
            if (modelValue.paramId === paramId) {
                modelValue.value = value;
            }

            return modelValue;
        });

        this.setState({model});
    }
}

interface ParamEditorFieldProps {
    param: Param;
    model: Model;
    setValue: (paramId, value) => void;
}

export const ParamEditorField: FC<ParamEditorFieldProps> = ({param, model, setValue}) => {
    const modelValue = model.paramValues.find(item => param.id === item.paramId);

    const type = param.type || 'text';

    return (
        <input type={type} value={modelValue.value} onChange={e => setValue(param.id, e.target.value)}/>
    );
}

export default ParamEditor;
