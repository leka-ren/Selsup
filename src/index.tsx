import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Const
const params = [
  { id: 1, name: "назначение", type: "string" },
  { id: 2, name: "длина", type: "string" },
  { id: 3, name: "длина", type: "string" },
  { id: 4, name: "длина", type: "string" },
] as {
  id: number;
  name: string;
  type: "string";
  }[];

const model = {
  paramValues: [
    { paramId: 1, value: "повседневное" },
    { paramId: 2, value: "макси" },
    { paramId: 3, value: "миди" },
    { paramId: 4, value: "мини" },
  ],
};

// Types
interface Param {
  id: number;
  name: string;
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
  model: Model;
}

// Components
class ParamEditor extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      model: this.props.model,
    };
  }

  paramChangeHandler = (paramId: number, value: string) => {
    const updatedParamValues = this.state.model.paramValues.map((paramValue) =>
      paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
    );

    this.setState({
      model: { ...this.state.model, paramValues: updatedParamValues },
    });
  };

  public getModel = (): Model => {
    return this.state.model;
  };

  render() {
    return (
      <div>
        {this.props.params.map((param) => (
          <div key={param.id}>
            <label>
              {param.name}:
              <input
                type="text"
                value={
                  this.state.model.paramValues.find(
                    (el) => el.paramId === param.id
                  )?.value || ""
                }
                onChange={(e) =>
                  this.paramChangeHandler(param.id, e.target.value)
                }
              />
            </label>
          </div>
        ))}
      </div>
    );
  }
}

root.render(
  <React.StrictMode>
    <ParamEditor params={params} model={model} />
  </React.StrictMode>
);
