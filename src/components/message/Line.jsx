import moment from "moment";

const Line = ({ time }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ flex: 1, backgroundColor: "#04B486", height: "1px" }} />

      <p style={{ margin: "0 10px" }}>{moment(time).format("DD/MM/YYYY")}</p>

      <div style={{ flex: 1, backgroundColor: "#04B486", height: "1px" }} />
    </div>
  );
};

export default Line;
