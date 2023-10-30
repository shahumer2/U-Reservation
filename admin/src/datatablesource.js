export const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 180,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk19UWjBFGn7wEiHh3s5O6zhEDSKCdN6GybsijVzp4oA&s"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];
export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },

  {
    field: "name",
    headerName: "Name",
    width: 230,
  },

  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 240 },

  {
    field: "title",
    headerName: "Title",
    width: 130,
  },

  {
    field: "desc",
    headerName: "Description",
    width: 250,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxpeople",
    headerName: "Maxpeople",
    width: 100,
  },
];

//temporary data
