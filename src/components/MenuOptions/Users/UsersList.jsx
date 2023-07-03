import React, { Fragment } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Chip,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

function UsersList({ user }) {
  //const isLast = userlist.length - 1;
  //const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

  return (
    <Fragment>
      <tr key={user.userid}>
        <td className="p-4 border-b border-blue-gray-50">
          <div className="flex items-center gap-3">
            <Avatar
              src="http://localhost:4000/api/user/foto/0ffe7d2c-779b-41ac-9186-4ca196edb230"
              alt={user.nombres_user}
              size="sm"
            />
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {user.nombres_user}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {user.correo_personal_user}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {user.correo_institucional_user}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {user.userid}
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-70"
              >
                {user.nombre_firma_user}
              </Typography>
            </div>
          </div>
        </td>

        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.identi}
          </Typography>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Typography variant="small" color="blue-gray" className="font-normal">
            {user.numero_celular_user}
          </Typography>
        </td>

        <td className="p-4 border-b border-blue-gray-50">
          <div className="w-max">
            <Chip
              variant="ghost"
              size="sm"
              value={user.estado_user ? "True" : "False"}
              color={user.estado_user ? "green" : "blue-gray"}
            />
          </div>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <Tooltip content="Edit User">
            <IconButton variant="text" color="blue-gray">
              <PencilIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </td>
      </tr>
    </Fragment>
  );
}

export default UsersList;
