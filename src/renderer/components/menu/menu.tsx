import { Link, useNavigate } from 'react-router-dom';

export interface menuItemInterface {
  name: string;
  path: string;
  enabled: boolean;
  visibility: boolean;
}

function MenuComponent(_props: any) {
  const navigate = useNavigate();

  const processLogout = async () => {
    console.log('initiate logout..', await window.commonHandler.getCookie([]));
    if ((await window.commonHandler.getCookie(['logout'])).length === 0)
      navigate('/login');
  };

  return (
    <>
      <p>Menu</p>
      <ul>
        {_props?.menu?.map((item: menuItemInterface) => (
          <li key={item.name}>
            {item.visibility && <Link to={item.name}> {item.name} </Link>}
          </li>
        ))}
        {_props?.logout && (
          <button type="button" onClick={processLogout}>
            Log Out
          </button>
        )}
      </ul>
    </>
  );
}

export default MenuComponent;
