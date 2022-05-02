const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3001;
const app = express();
app.use(bodyParser.json())
app.use(cors({ origin: "http://localhost:3000" }));

const posts = [
  { 
    id: 1,
    createdTime: "2022-01-01",
    fromId: 1,
    fromName: "John Doe",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec est dui, blandit nec aliquet et, aliquam at lectus. Aenean fermentum eros in quam pellentesque, et aliquam turpis pulvinar. Aenean vel tellus nec urna aliquam accumsan. Fusce non ligula congue, luctus dolor ut, tristique tellus. Vivamus ex dui, mattis vitae blandit sed, consectetur in augue. Quisque quis pellentesque eros. Praesent ut elit quis ex porttitor molestie. Aliquam erat volutpat. Suspendisse ornare mollis risus vitae posuere. Phasellus diam nulla, gravida nec neque ut, accumsan euismod lectus. Etiam at rhoncus turpis. Curabitur vel semper ante.",
    type: "text"
  },
  { 
    id: 2,
    createdTime: "2022-03-05",
    fromId: 1,
    fromName: "John Doe",
    message: "Donec libero augue, tincidunt sit amet purus sit amet, consectetur pharetra sem. Nulla dignissim feugiat vestibulum. Nulla facilisi. Sed pellentesque purus libero, in scelerisque est mattis in. Etiam tempor ut elit sed luctus. In lobortis, tortor in maximus semper, ligula nulla viverra risus, vel porta ligula augue sed mauris. Morbi at odio ac diam consectetur mollis. Quisque rhoncus ligula purus, non molestie enim vestibulum egestas.",
    type: "text"
  },
  { 
    id: 3,
    createdTime: "2022-04-14",
    fromId: 2,
    fromName: "Jane Doe",
    message: "Lorem ipsum dolor sit amet, sed volutpat tortor metus, eu tincidunt tellus porttitor viverra. Mauris nec lectus sit amet felis dignissim facilisis. Vivamus suscipit tellus odio, sed luctus odio egestas vel. Proin molestie, sem et faucibus cursus, nunc mauris maximus ex, vel viverra justo dui egestas nisi. In finibus ultricies posuere. Mauris vel lectus eu lectus lobortis rhoncus. Fusce nisi libero, malesuada ut magna at, convallis aliquam lorem. Cras a iaculis augue. Suspendisse non arcu placerat magna cursus ullamcorper id vel ligula. Integer suscipit tempor erat rutrum ornare. Nam rutrum luctus suscipit. Suspendisse ac erat quis turpis viverra faucibus nec id tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque ultricies, neque in tincidunt efficitur, ligula ligula varius urna, sed accumsan nisl turpis a magna. Suspendisse sit amet pulvinar orci. Nullam luctus at libero cursus blandit.",
    type: "text"
  },
  { 
    id: 4,
    createdTime: "2022-01-20",
    fromId: 2,
    fromName: "Jane Doe",
    message: "Mauris malesuada accumsan sapien. Etiam consectetur purus elit, quis ultricies enim ornare ut. Cras laoreet cursus massa, sed luctus ipsum vestibulum sed. Cras quis orci at orci ultrices tempus efficitur a risus. Duis tellus ipsum, egestas id tempor posuere, accumsan non libero. Morbi sollicitudin augue et ligula venenatis lobortis. Aliquam euismod erat vitae nulla pretium mollis. Quisque commodo quis nibh a accumsan. Fusce eu leo sem. Vivamus lacinia consequat urna, ac maximus risus euismod a. Etiam dictum mattis velit eu maximus.",
    type: "text"
  },
  { 
    id: 5,
    createdTime: "2022-01-21",
    fromId: 2,
    fromName: "Jane Doe",
    message: "Just a test post",
    type: "text"
  },
];

app.post("/login", (req, res) => {
  console.log("Got body:", req.body);
  res.json({ ...req.body, login_token: "12345" });
  res.status(200).end();
});

app.get("/posts", (req, res) => {
  console.log("Got query:", req.query);
  res.json({ posts });
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
