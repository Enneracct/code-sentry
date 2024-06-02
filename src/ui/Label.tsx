import { darken, lighten } from "polished";

interface LabelProprs {
  name: string;
  color: string;
}

const Label = ({ name, color }: LabelProprs) => {
  const darkerName = darken(0.3, `#${color}85`);
  const lightColor = lighten(0.2, `#${color}`);

  return (
    <span
      style={{
        backgroundColor: `${darkerName}`,
        padding: "4px 12px",
        width: "fit-content",
        blockSize: "fit-content",
        color: `${lightColor}`,
        borderRadius: "2rem",
        // border: `1px solid #${color}`,
        fontSize: "14px",
      }}
    >
      {name}
    </span>
  );
};

export default Label;
