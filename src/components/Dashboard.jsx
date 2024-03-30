import { useEffect, useState } from "react";
import logo from "../../public/Screenshot 2024-03-25 144353.png";
import dashboardBg from "../../public/Screenshot_2024-03-25_144339-removebg-preview (1).png";
import ukLogo from "../../public/daab37fd372ddb4949adebcd73166a20.png";
import contentImg from "../../public/Screenshot 2024-03-28 233417.png";
import userDp from "../../public/images.jpg";
import userImg1 from "../../public/MV5BMjA3ODA0MDI4OF5BMl5BanBnXkFtZTgwMjEyNzI3MDE@._V1_.jpg";
import { BsBellFill } from "react-icons/bs";
import { IoMail } from "react-icons/io5";
import { LuSearch } from "react-icons/lu";
import { MdOutlineSearch } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { RiBarChartBoxFill } from "react-icons/ri";
import { AiFillAppstore } from "react-icons/ai";
import { Md3DRotation } from "react-icons/md";
import { BiSolidMessageError } from "react-icons/bi";
import { RiFileList3Fill } from "react-icons/ri";
import { MdShoppingCart } from "react-icons/md";
import { BsFire } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { HiUsers } from "react-icons/hi2";
import { IoSettings } from "react-icons/io5";
import { RiFileUserFill } from "react-icons/ri";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import Map from "../MapBox";
import { imageDb } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
  RightOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, notification } from "antd";
const { Header, Sider, Content } = Layout;

function Dashboard({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("0");
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userName, setUserName] = useState("");
  const name = localStorage.getItem("userName");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("login");
    navigate("/");
  };

  const handleEditProject = () => {
    notification.error({
      message: "This service is temporarily suspended",
    });
  };

  const updateScreenSize = () => {
    setCollapsed(!window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined className="mr-2" />
        Logout
      </Menu.Item>
      <Menu.Item
        key="profile"
        onClick={() =>
          notification.error({
            message: "This service is temporarily suspended",
          })
        }
      >
        <UserOutlined className="mr-2" />
        My Profile
      </Menu.Item>
    </Menu>
  );

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const getIconColor = (isSelected) => {
    return isSelected ? "#FFFFFF" : "#FF4438";
  };

  const handleMenuSelect = (e) => {
    setSelectedKey(e.key);
  };

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    const imgRef = ref(imageDb, `Files/${v4()}`);
    localStorage.setItem("userName", userName);

    uploadBytes(imgRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            console.log("File available at", url);
            setImageUrl(url);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="bg-white-important"
      >
        <div className="demo-logo-vertical" />
        <div
          style={{ height: 75 }}
          className="flex items-center pl-7 border-b-2 border-gray-200"
        >
          <img style={{ width: 150, height: 60 }} src={logo} alt="" />
        </div>
        <br />
        <div style={{ height: "35px" }} className="flex items-center">
          <h1
            className="pl-6 text-base text-black"
            style={{ color: "#ADB5BD" }}
          >
            Home
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          className="custom-menu"
          items={[
            {
              key: "1",
              icon: (
                <AiFillAppstore
                  style={{
                    color: getIconColor(selectedKey === "1"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Dashboard</span>,
            },
          ]}
        />
        <div style={{ height: "35px" }} className="flex items-center">
          <h1
            className="pl-6 text-base text-black"
            style={{ color: "#ADB5BD" }}
          >
            Pages
          </h1>
        </div>

        <div className="dashboard-bg">
          <div className="absolute-img">
            <img
              className="opacity-30 w-[9vw] h-[30vh]"
              src={dashboardBg}
              alt=""
            />
          </div>
        </div>

        <Menu
          className="border-b-2 border-gray-200"
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          items={[
            {
              key: "2",
              icon: (
                <RiBarChartBoxFill
                  style={{
                    color: getIconColor(selectedKey === "2"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Project Info</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "3",
              icon: (
                <Md3DRotation
                  style={{
                    color: getIconColor(selectedKey === "3"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Viewer</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "4",
              icon: (
                <BiSolidMessageError
                  style={{
                    color: getIconColor(selectedKey === "4"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Asset Info</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "5",
              icon: (
                <RiFileList3Fill
                  style={{
                    color: getIconColor(selectedKey === "5"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Work Order</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "6",
              icon: (
                <MdShoppingCart
                  style={{
                    color: getIconColor(selectedKey === "6"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Procurement</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "7",
              icon: (
                <BsFire
                  style={{
                    color: getIconColor(selectedKey === "7"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px " }}>Energy Monitr</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "8",
              icon: (
                <FaCalendarAlt
                  style={{
                    color: getIconColor(selectedKey === "8"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Calendar</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "9",
              icon: (
                <GrDocumentText
                  style={{
                    color: getIconColor(selectedKey === "9"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Report</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "10",
              icon: (
                <HiUsers
                  style={{
                    color: getIconColor(selectedKey === "10"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Users</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "11",
              icon: (
                <IoSettings
                  style={{
                    color: getIconColor(selectedKey === "11"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>Settings</span>,
              itemIcon: <RightOutlined />,
            },
            {
              key: "12",
              icon: (
                <RiFileUserFill
                  style={{
                    color: getIconColor(selectedKey === "12"),
                    opacity: 0.8,
                    height: "24px",
                    width: "24px",
                  }}
                />
              ),
              label: <span style={{ fontSize: "16px" }}>About</span>,
              itemIcon: <RightOutlined />,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: 75,
          }}
        >
          <div
            className="relative flex items-center justify-between h-[25vh]"
            style={{ height: "75px" }}
          >
            <div className="lg:flex lg:items-center lg:justify-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className="md:pr-0 ml-3 mr-3 hidden sm:block"
              />
              <LuSearch className="absolute hidden lg:block w-[3vw] h-[3vh] left-16 top-7 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 hidden lg:block rounded-md text-base pl-10 pr-4 mt-5 focus:outline-none mb-5 shadow-md"
                style={{
                  borderColor: "#EA4335",
                  height: "36px",
                  width: "310px",
                  color: "#ADB5BD",
                  marginLeft: "5px",
                }}
              />
            </div>
            <div className="flex items-center justify-center pr-16 gap-5">
              <img
                src={ukLogo}
                className="rounded-full"
                style={{ width: "30px", height: "30px" }}
                alt=""
              />
              <BsBellFill
                style={{
                  color: "#FF4438",
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                }}
              />
              <IoMail
                style={{
                  color: "#FF4438",
                  width: "25px",
                  height: "25px",
                  cursor: "pointer",
                }}
              />

              <Dropdown overlay={menu} placement="bottomLeft">
                <img
                  src={imageUrl || userDp}
                  className="rounded-full cursor-pointer"
                  style={{ width: "45px", height: "45px" }}
                  alt=""
                />
              </Dropdown>

              <div className="flex-row items-center justify-center hidden md:block">
                <h1 className="cursor-pointer text-black h-4">
                  {name ? name : "John Doe"}
                </h1>
                <span className="h-4 text-xs text-gray-700">
                  Facility Manager
                </span>
              </div>
            </div>
          </div>
        </Header>
        <Content
          className="lg:p-6 md:p-4 p-2 w-fit"
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            backgroundColor: "#E9ECEF",
            flexWrap: "wrap",
            alignItems: "flex-start",
            overflow: scroll,
          }}
        >
          <div className="relative flex justify-between  flex-wrap h-[15vh] mb-5 lg:mb-0">
            <MdOutlineSearch className="absolute md:w-[3vw] md:h-[3vh] w-5 h-5 top-2 lg:left-0 sm:left-4 left-2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Project"
              style={{
                height: "36px",
                color: "#ADB5BD",
              }}
              className="border border-gray-300 rounded-md text-base py-2 pl-10 focus:outline-none mb-5 shadow md:w-[50vw] w-[74vw]"
            />
            <div className="flex gap-1">
              <Button
                style={{
                  backgroundColor: "grey",
                  color: "white",
                }}
                className="h-9 md:w-40 w-32"
                onClick={handleEditProfile}
              >
                Edit Profile
              </Button>

              {showModal && (
                <>
                  <div className="modal-backdrop"></div>
                  <div className="modal">
                    <div className="modal-content">
                      <div className="flex items-center justify-end cursor-pointer">
                        <span
                          className="text-2xl font-bold"
                          onClick={handleCloseModal}
                        >
                          &times;
                        </span>
                      </div>
                      <h2 className="text-black text-base md:text-xl">
                        Edit Profile
                      </h2>
                      <br />
                      <div>
                        <label
                          htmlFor="username"
                          className="text-black opacity-70 mr-3"
                        >
                          Username:
                        </label>
                        <input
                          className="py-2 pl-3 md:w-[25vw] w-[40vw]  mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Enter your new username"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          style={{ color: "#8A92A6", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="profilePicture"
                          className="text-black opacity-70 mr-3"
                        >
                          Profile Picture:
                        </label>
                        <input
                          className="py-2 pl-3 md:w-[25vw] w-[40vw]  mb-4 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                          type="file"
                          id="profilePicture"
                          name="profilePicture"
                          accept="image/*"
                          onChange={(e) => setFile(e.target.files[0])}
                          style={{ color: "#8A92A6", fontSize: "14px" }}
                        />
                      </div>
                      <br />
                      <div className="flex justify-center">
                        <button
                          onClick={handleSubmit}
                          className="bg-blue-500 ml-3 p-2 rounded hover:bg-blue-600 text-white"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              <Button
                style={{
                  backgroundColor: "#FF4438",
                  color: "white",
                }}
                className="sm:ml-7 ml-0 h-9 md:w-40 w-32"
              >
                Add New Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="lg:col-span-1 col-span-2 lg:mr-6 mr-0 lg:pb-0 pb-5">
              <div className="project-info mb-6">
                <div className="bg-white flex-1 lg:h-[42vh] xl:h-[20vw] h-[45vh] p-5 rounded-md">
                  <div className="flex justify-between">
                    <h1 className="font-bold text-xl">Project Info</h1>
                    <MdEdit
                      onClick={handleEditProject}
                      className="md:w-[3vw] w-[5vw] h-[5vh] md:h-[3vh] cursor-pointer"
                    />
                  </div>
                  <br />

                  <div className="flex justify-between">
                    <h1 className="flex-1 font-semibold text-base">
                      Project Name
                    </h1>

                    <div className="flex-1 flex items-start justify-start ">
                      <h1 className="font-semibold text-base">Building Area</h1>
                    </div>
                  </div>

                  <div className="flex justify-between border-b-2">
                    <h1
                      className="flex-1 text-xs font-semibold"
                      style={{ color: "#FF4438" }}
                    >
                      ABC Office
                    </h1>

                    <div className="flex-1 flex items-start justify-start ">
                      <h1
                        className="text-xs font-semibold"
                        style={{ color: "#FF4438" }}
                      >
                        8,500 Sq. m
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <h1 className="flex-1 font-semibold text-base">
                      Sub-Project
                    </h1>

                    <div className="flex-1 flex items-start justify-start ">
                      <h1 className="font-semibold text-base ">
                        Contract Duration
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-between border-b-2">
                    <h1
                      className="flex-1 text-xs font-semibold"
                      style={{ color: "#FF4438" }}
                    >
                      NA
                    </h1>

                    <div className="flex-1 flex items-start justify-start ">
                      <h1
                        className="text-xs font-semibold"
                        style={{ color: "#FF4438" }}
                      >
                        2 Years
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-between pt-3">
                    <h1 className="flex-1 font-semibold text-base">Location</h1>

                    <div className="flex-1 flex items-start justify-start ">
                      <h1 className="font-semibold text-base">
                        Account Status
                      </h1>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <h1
                      className="flex-1 text-xs font-semibold lg:pr-0 pr-2"
                      style={{ color: "#FF4438" }}
                    >
                      Kakkanad, Kochi, India
                    </h1>

                    <div className="flex-1 flex items-start justify-start">
                      <h1
                        className="text-xs font-semibold"
                        style={{ color: "#FF4438" }}
                      >
                        Active
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" bg-white rounded-md p-1">
                <h1 className="font-bold text-xl lg:p-5 md:p-2 p-0">
                  Location
                </h1>
                <Map />
              </div>
            </div>

            <div className="lg:col-span-1 col-span-2">
              <div className="building-image">
                <div className="lg:p-5 p-2 bg-white">
                  <img
                    className="lg:w-[40vw] lg:h-[50vh]"
                    src={contentImg}
                    alt=""
                  />
                </div>
              </div>

              <div className="grid grid-cols-2">
                <div className="users lg:mr-6 mt-6 col-span-2 lg:col-span-1">
                  <div className="bg-white h-[45vh] rounded-md p-8">
                    <div>
                      <h1 className="font-bold text-xl">Users</h1>
                    </div>
                    <br />

                    <div className="flex">
                      <img
                        className="rounded-full w-10 h-10"
                        src={userImg1}
                        alt=""
                      />
                      <div className="flex-col ml-5">
                        <h1 className="font-semibold text-base">Anna Mull</h1>
                        <h1 className="text-xs font-semibold opacity-60">
                          Administrator
                        </h1>
                      </div>
                    </div>
                    <br />

                    <div className="flex">
                      <img
                        className="rounded-full w-10 h-10"
                        src={userImg1}
                        alt=""
                      />
                      <div className="flex-col ml-5">
                        <h1 className="font-semibold text-base">John Doe</h1>
                        <h1 className="text-xs font-semibold opacity-60">
                          Facility Manager
                        </h1>
                      </div>
                    </div>
                    <br />

                    <div className="felx items-center justify-center">
                      <Button
                        className="w-full"
                        style={{
                          backgroundColor: "#FF4438",
                          color: "white",
                          height: "38px",
                        }}
                      >
                        See All
                      </Button>{" "}
                    </div>
                  </div>
                </div>

                <div className="work-order mt-6 col-span-2 lg:col-span-1">
                  <div className="h-[45vh] bg-white rounded-md p-8">
                    <div>
                      <h1 className="font-bold text-xl">Work Order</h1>
                    </div>
                    <br />
                    <div>
                      <div className="bg-red-200 flex items-center h-[4vh] p-2 justify-between rounded text-base font-medium opacity-75">
                        <p>Open</p>
                        <p className="mr-20">2</p>
                      </div>
                    </div>
                    <br />

                    <div>
                      <div className="bg-red-200 flex items-center h-[4vh] p-2 justify-between rounded text-base font-medium opacity-75">
                        <p>Overdue</p>
                        <p className="mr-20">2</p>
                      </div>
                    </div>
                    <br />

                    <div>
                      <div className="bg-red-200 flex items-center h-[4vh] p-2 justify-between rounded text-base font-medium opacity-75">
                        <p>Inprogress</p>
                        <p className="mr-20">1</p>
                      </div>
                    </div>
                    <br />

                    <div className="felx items-center justify-center mt-2">
                      <Button
                        className="w-full"
                        style={{
                          backgroundColor: "#FF4438",
                          color: "white",
                          height: "38px",
                        }}
                      >
                        See All
                      </Button>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
export default Dashboard;
