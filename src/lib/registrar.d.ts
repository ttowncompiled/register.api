type Register = (symbol : string, property : Property) => void;

type Execute = () => void;

type Program = (exporter : Register) => Receipt;

interface Receipt {
  execute : Execute;
  setters : Setter[];
}

type Setter = (mdl : Module) => void;
