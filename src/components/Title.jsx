import wallet from "../assets/icons/wallet.svg";

function Title({ icon = wallet, title = "Freeze All" }) {
  return (
    <div className="flex items-center gap-2">
      <img src={icon} alt="" className="h-6 w-6" />
      <h1 className="text-header text-darkgray">{title}</h1>
    </div>
  );
}

export default Title;