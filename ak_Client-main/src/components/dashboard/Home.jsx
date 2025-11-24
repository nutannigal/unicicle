import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import DataTable from "react-data-table-component"; // Import DataTable

export function Home() {
  const customStyles = {
    rows: {
      style: {
        background: "rgba(228, 233, 243, 0.6)",
        marginTop: "6PX",
        border: "none",
        height: "30px",
        fontSize: "10px",
        fontWeight: "500"
      },
    },
    headCells: {
      style: {
        color: "#1F3977",
      },
    },
    head: {
      style: {
        fontWeight: "400",
        fontSize: "9px",
        boxShadow: "0 0 1px rgba(0,0,0,.125), 0 1px 3px rgba(0,0,0,.2)",
      },
    },
    table: {
      style: {
        marginTop: "0PX",
        height: "auto",
        display: "flex",
        height: "150px"
      },
    },
  };

  const token = localStorage.getItem('Token');
  const [data, setData] = useState([]);
  const [uni, setUniData] = useState([]);
  const navigate = useNavigate();
  const [flaggedData, setFlaggedData] = useState([]);
  const [allCountData, setAllCountData] = useState([]);
  const [bounceRateData, setBounceRateData] = useState([]);
  const [openModalId, setOpenModalId] = useState(null);

  async function fetchList() {
    try {
      const fetchCountResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_count",
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );
      
      const CountErrorCode = fetchCountResponse.data.error_code;
      
      if (CountErrorCode === 200) {
        const countListArray = fetchCountResponse.data.data[0];
        setData(countListArray);
      } else {
        setData([]);
        toast.error(fetchCountResponse.data.message || "Failed to fetch count data");
      }
    } catch (err) {
      console.log("Log in Fail", err);
      toast.error("Failed to fetch count data");
    }
  }

  async function getFlaggedContentData() {
    try {
      const flaggedResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_reported_post_details_2_limit",
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      
      const ErrorCode = flaggedResponse.data.error_code;
      if (ErrorCode === 200) {
        const _data = flaggedResponse.data.data;
        setFlaggedData(_data);
      } else {
        toast.error(flaggedResponse.data.message || "Failed to fetch flagged content");
      }
    } catch (err) {
      console.log("get flagged data error", err);
      toast.error("Failed to fetch flagged content");
    }
  }

  async function fetchUniversity() {
    try {
      const fetchUniversityResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_Primary_campus_info",
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );

      const UniversityErrorCode = fetchUniversityResponse.data.error_code;
      if (UniversityErrorCode === 200) {
        const universityListArray = fetchUniversityResponse.data.data;
        setUniData(universityListArray);
      } else {
        setUniData([]);
        toast.error(fetchUniversityResponse.data.message || "Failed to fetch university data");
      }
    } catch (err) {
      console.log("Log in Fail", err);
      toast.error("Failed to fetch university data");
    }
  }

  async function getAllCountData() {
    try {
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_get_homepage_cnts",
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );
      
      if (fetchResponse.data.error_code === 200) {
        setAllCountData(fetchResponse.data.data);
      } else {
        toast.error(fetchResponse.data.message || "Failed to fetch count data");
      }
    } catch (err) {
      console.log("Log in Fail", err);
      toast.error("Failed to fetch count data");
    }
  }

  async function getBounceRate() {
    try {
      const fetchResponse = await axios.get(
        process.env.REACT_APP_API_KEY + "admin_calculate_student_metrics",
        {
          headers: {
            "Content-Type": 'multipart/form-data',
            "Authorization": token,
          }
        }
      );
      
      if (fetchResponse.data.error_code === 200) {
        setBounceRateData(fetchResponse.data.data);
      } else {
        toast.error(fetchResponse.data.message || "Failed to fetch bounce rate data");
      }
    } catch (err) {
      console.log("bounce rate api error", err);
      toast.error("Failed to fetch bounce rate data");
    }
  }

  useEffect(() => {
    fetchList();
    fetchUniversity();
    getFlaggedContentData();
    getBounceRate();
    getAllCountData();
  }, []);

  const silentStudentFunc = async (s_id) => {
    try {
      const formData = new FormData();
      formData.append("stud_id", s_id);
      
      const silentStudentResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_change_student_freez_acc_status",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );
      
      const ErrorCode = silentStudentResponse.data.error_code;
      if (ErrorCode === 200) {
        getFlaggedContentData();
        setOpenModalId(null);
        toast.success(silentStudentResponse.data.message);
      } else {
        toast.error(silentStudentResponse.data.message || "Failed to update user status");
      }
    } catch (err) {
      console.log("silence user error", err);
      toast.error("Failed to update user status");
    }
  }

  const hidePostFunc = async (f_id) => {
    try {
      const formData = new FormData();
      formData.append("f_id", f_id);
      
      const hidePostResponse = await axios.post(
        process.env.REACT_APP_API_KEY + "admin_flagged_content_hide_post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      );

      const ErrorCode = hidePostResponse.data.error_code;
      if (ErrorCode === 200) {
        getFlaggedContentData();
        setOpenModalId(null);
        toast.success(hidePostResponse.data.message);
      } else {
        toast.error(hidePostResponse.data.message || "Failed to hide post");
      }
    } catch (err) {
      console.log("hide post error", err);
      toast.error("Failed to hide post");
    }
  }

  const openActionsModal = (reportId) => {
    setOpenModalId(openModalId === reportId ? null : reportId);
  }

  const closeActionsModal = () => {
    setOpenModalId(null);
  }

  const columns = [
    {
      name: "Reported by",
      selector: (row) => {
        return (
          <>
            <div className="">{row.reported_by_full_name}</div>
            <div className="nine_font_class">{row.reported_at}</div>
          </>
        );
      },
      sortable: true,
      width: "25%",
    },
    {
      name: "Category",
      selector: (row) => <div className="">{row.category}</div>,
      width: "10%",
      sortable: true,
    },
    {
      name: "Post",
      width: "35%",
      selector: (row) => (
        <div className="" style={{ width: "315px" }}>{row.f_description}</div>
      ),
      sortable: true,
    },
    {
      width: "10%",
      selector: (row) => {
        const array = row.feed_images ? row.feed_images.map(item => item.feed_img) : [];
        
        return (
          <>
            {array.length === 0 ? (
              <div>
                <img
                  style={{ height: "30px", width: "60px", margin: "2px", objectFit: "contain" }}
                  src="dist/img/event_photo.png"
                  alt="Default"
                />
              </div>
            ) : (
              <div>
                <img
                  style={{ height: "30px", width: "60px", margin: "2px", objectFit: "contain" }}
                  src={array[0]}
                  alt="Post"
                />
              </div>
            )}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Posted by",
      selector: (row) => <div className="">{row.posted_by_full_name}</div>,
      sortable: true,
      width: "10%",
    },
    {
      name: "Status",
      width: "10%",
      selector: (row) => (
        <>
          {row.feed_status === 0 ? (
            <div className="">Hidden</div>
          ) : (
            <div className="">Keep Post</div>
          )}
        </>
      ),
      sortable: true,
    },
    {
      name: "",
      width: "auto",
      cell: (row) => {
        return (
          <div className="d-flex" style={{ width: "100%", position: "relative" }}>
            <div
              className="action_buttons_end_css"
              onClick={() => openActionsModal(row.report_id)}
            >
              <button className="all_action_buttons">
                Actions
              </button>
            </div>
            
            {openModalId === row.report_id && (
              <div
                className="edit_campus_modal actions_modal"
                style={{
                  position: "absolute",
                  top: "30px",
                  right: "15px",
                  width: "335px",
                  zIndex: 1000,
                  background: "white",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  borderRadius: "5px",
                  padding: "10px"
                }}
              >
                <div>
                  <div className="d-flex ml-auto">
                    <img
                      className="campus_img ml-auto"
                      src="dist/img/Cancel.png"
                      alt="Close"
                      onClick={closeActionsModal}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  
                  {row.feed_status === 0 ? (
                    <div
                      className="hover_class p-2"
                      onClick={() => hidePostFunc(row.f_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex flex-row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img className="campus_img" src="dist/img/ThumbsUp.png" alt="Keep Post" />
                        </div>
                        <div className="flag_inner_div">
                          <div style={{ fontSize: "10px", fontWeight: "600" }}>Keep Post</div>
                          <div style={{ fontSize: "9px", fontWeight: "500" }}>
                            Disagree with flag and keep the post unchanged
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="d-flex flex-row hover_class p-2"
                      onClick={() => hidePostFunc(row.f_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex flex-row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img className="campus_img" src="dist/img/PostHide.png" alt="Hide Post" />
                        </div>
                        <div className="flag_inner_div">
                          <div style={{ fontSize: "10px", fontWeight: "600" }}>Hide Post</div>
                          <div style={{ fontSize: "9px", fontWeight: "500" }}>
                            Hide this post and send a warning message
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {row.acc_freeze === 0 ? (
                    <div
                      className="d-flex flex-row hover_class p-2"
                      onClick={() => silentStudentFunc(row.posted_by_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex flex-row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img className="campus_img" src="dist/img/PostSilence.png" alt="Silence User" />
                        </div>
                        <div className="flag_inner_div">
                          <div style={{ fontSize: "10px", fontWeight: "600" }}>Silence User</div>
                          <div style={{ fontSize: "9px", fontWeight: "500" }}>
                            A silenced user has all posting disabled
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="d-flex flex-row hover_class p-2"
                      onClick={() => silentStudentFunc(row.posted_by_id)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="d-flex flex-row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img className="campus_img" src="dist/img/PostSilence.png" alt="Unfreeze User" />
                        </div>
                        <div className="flag_inner_div">
                          <div style={{ fontSize: "10px", fontWeight: "600" }}>Unfreeze User</div>
                          <div style={{ fontSize: "9px", fontWeight: "500" }}>
                            Unfreezed user has all posting enables
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="content-wrapper" style={{ padding: "10px 0px" }}>
      {/* Add Toaster component here */}
      <Toaster position="top-right" reverseOrder={false} />

      <div>
        <section className="mt-0">
          <div className="p-0 container-fluid table-cards">
            {/* 1st row */}
            <div className="table-cards" style={{ marginBottom: "15px" }}>
              <div className="row">
                <div className="col-md-12">
                  <div style={{
                    display: "flex", alignItems: "center",
                    width: "100%", boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                    marginBottom: "12px", borderRadius: "3px", height: "50px",
                    background: "#6C7A99"
                  }}>
                    <Link to="/feedHomePage" style={{ width: "100%" }}>
                      <div className="d-flex flex-row" style={{ paddingLeft: "10px", alignItems: 'center' }}>
                        <div>
                          {uni.map((item, index) => {
                            return (
                              <div key={index}>
                                {item.profile == null ? (
                                  <div>
                                    <img src={require('./images/no_image.png')} alt="Default" style={{ width: "40px", height: "40px", borderRadius: "3px" }} />
                                  </div>
                                ) : (
                                  <div>
                                    <img src={item.profile} alt="profile image" style={{ width: "40px", height: "40px", borderRadius: "3px" }} />
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>

                        <div style={{
                          width: "100%", marginLeft: "20px", border: "none",
                          fontFamily: "poppins", fontStyle: "normal", fontWeight: "600",
                          height: "31px", fontSize: "12px", lineHeight: "30px", color: "white"
                        }}>
                          {uni.map((item, index) => {
                            return (
                              <div key={index}>
                                {item.campus_name}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3"
                  style={{
                    height: "100%",
                    paddingRight: "2px",
                    margin: "0",
                  }}
                >
                  <Link to="/student">
                    <div
                      className="small-box"
                      style={{
                        height: "80px",
                        boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
                        borderRadius: "3PX",
                      }}
                    >
                      <div className="inner flagged_inner d-flex" style={{ justifyContent: "space-between" }}>
                        <div className="">
                          <div
                            style={{
                              fontWeight: "500",
                              color: "#848484",
                              fontSize: "11px",
                              fontFamily: "Poppins",
                            }}
                          >
                            Total Users
                          </div>
                          <div>
                            <h5
                              style={{
                                fontWeight: "600",
                                fontSize: "20px",
                                color: "black",
                                paddingTop: "10px",
                                fontFamily: "Poppins",
                              }}
                            >
                              {allCountData.total_users_cnt || 0}
                            </h5>
                          </div>
                        </div>
                        <div className="d-flex">
                          <img
                            src="dist/img/Teacher.png"
                            alt="planner"
                            className="ml-auto all_icon_imgs"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>

                <div className="col-md-1"
                  style={{
                    height: "100%",
                    marginBottom: "12px",
                    paddingLeft: "2px", paddingRight: "2px"
                  }}
                >
                  <div
                    className="small-box"
                    style={{
                      height: "80px",
                      boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
                      borderRadius: "3PX",
                    }}
                  >
                    <div className="inner flagged_inner">
                      <div
                        style={{
                          fontWeight: "500",
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "9px",
                          fontFamily: "Poppins",
                          color: "#4AA081"
                        }}
                      >
                        Active
                      </div>
                      <h5
                        style={{
                          fontWeight: "600",
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "20px",
                          color: "black",
                          paddingTop: "10px",
                          fontFamily: "Poppins",
                        }}
                      >
                        {allCountData.active_users || 0}
                      </h5>
                    </div>
                  </div>
                </div>

                <div className="col-md-1"
                  style={{
                    height: "100%", paddingLeft: "2px", paddingRight: "2px"
                  }}
                >
                  <div
                    className="small-box"
                    style={{
                      height: "80px",
                      boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)",
                      borderRadius: "3PX",
                    }}
                  >
                    <div className="inner flagged_inner">
                      <div
                        style={{
                          fontWeight: "500",
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "9px",
                          fontFamily: "Poppins",
                          color: "#EB3F3F"
                        }}
                      >
                        Inactive
                      </div>
                      <h5
                        style={{
                          fontWeight: "600",
                          display: "flex",
                          justifyContent: "center",
                          fontSize: "20px",
                          color: "black",
                          paddingTop: "10px",
                          fontFamily: "Poppins",
                        }}
                      >
                        {allCountData.inactive_users || 0}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2nd row */}
              <div className="mt-1" style={{ paddingLeft: "2px", paddingRight: "2px" }}>
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{
                      height: "100%",
                      marginTop: "10PX",
                    }}
                  >
                    <div
                      className="small-box"
                      style={{
                        padding: "0px",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                        borderRadius: "0px 0px 5px 5px",
                      }}
                    >
                      <div className="">
                        <div>
                          <div
                            style={{
                              background: "rgb(108, 122, 153)",
                              color: "#fff",
                              padding: "3px 7px 5px 25px"
                            }}
                          >
                            <span className="ten_font_class">Analytics Dashboard</span>
                          </div>
                        </div>

                        <div className="event_inner_div" style={{ minHeight: "120px" }}>
                          <div className="row m-0">
                            <div className="col-md-4"
                              style={{
                                height: "100%",
                                margin: "0",
                              }}
                            >
                              <div
                                className="small-box box_border_class"
                                style={{
                                  height: "85px",
                                  marginTop: "10px"
                                }}
                              >
                                <div className="inner flagged_inner">
                                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                    <div className="">
                                      <div className="eleven_font_class"
                                        style={{ color: "#1F3977" }}
                                      >
                                        Users
                                      </div>
                                      <div style={{ display: "flex", gap: "5px" }}>
                                        <h5 className="twenty_font_class"
                                          style={{ color: "black" }}
                                        >
                                          {bounceRateData.total_students || 0}
                                        </h5>
                                        <span className="ten_font_class" style={{ color: "#4AA081", display: "flex", alignItems: "center" }}>
                                          (+40%)
                                        </span>
                                      </div>
                                    </div>
                                    <div className="d-flex p-0"
                                      style={{
                                        justifyContent: "center", alignItems: "center",
                                        background: "#E1EBFF", width: "40px", borderRadius: "3px"
                                      }}>
                                      <img
                                        src="dist/img/UsersIcon.png"
                                        className="all_icon_imgs"
                                        alt="Users"
                                      />
                                    </div>
                                  </div>
                                  <div className="">
                                    <div className="">
                                      <div>
                                        <span className="nine_font_class" style={{ color: "#293043" }}>
                                          Analytics for last week
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-4"
                              style={{
                                height: "100%",
                                margin: "0",
                              }}
                            >
                              <div
                                className="small-box box_border_class"
                                style={{
                                  height: "85px",
                                  marginTop: "10px"
                                }}
                              >
                                <div className="inner flagged_inner">
                                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                    <div className="">
                                      <div className="eleven_font_class"
                                        style={{ color: "#1F3977" }}
                                      >
                                        Bounce Rate
                                      </div>
                                      <div style={{ display: "flex", gap: "5px" }}>
                                        <h5 className="twenty_font_class"
                                          style={{ color: "black" }}
                                        >
                                          {bounceRateData.bounce_rate || 0}%
                                        </h5>
                                        <span className="ten_font_class" style={{ color: "#4AA081", display: "flex", alignItems: "center" }}>
                                          (+40%)
                                        </span>
                                      </div>
                                    </div>
                                    <div className="d-flex p-0" style={{
                                      justifyContent: "center", alignItems: "center",
                                      background: "#FBE1FF", width: "40px", borderRadius: "3px"
                                    }}>
                                      <img
                                        src="dist/img/ComboChart.png"
                                        className="all_icon_imgs"
                                        alt="Bounce Rate"
                                      />
                                    </div>
                                  </div>
                                  <div className="">
                                    <div className="col-md-12">
                                      <div>
                                        <span className="nine_font_class" style={{ color: "#293043" }}>
                                          Analytics for last week
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-4"
                              style={{
                                height: "100%",
                                margin: "0",
                              }}
                            >
                              <div
                                className="small-box box_border_class"
                                style={{
                                  height: "85px",
                                  marginTop: "10px"
                                }}
                              >
                                <div className="inner flagged_inner">
                                  <div className="d-flex" style={{ justifyContent: "space-between" }}>
                                    <div className="">
                                      <div className="eleven_font_class"
                                        style={{ color: "#1F3977" }}
                                      >
                                        Time on App
                                      </div>
                                      <div style={{ display: "flex", gap: "5px" }}>
                                        <h5 className="twenty_font_class"
                                          style={{ color: "black" }}
                                        >
                                          {bounceRateData.average_time || 0}m
                                        </h5>
                                        <span className="ten_font_class" style={{ color: "#EB3F3F", display: "flex", alignItems: "center" }}>
                                          (-16%)
                                        </span>
                                      </div>
                                    </div>
                                    <div className="d-flex p-0" style={{
                                      justifyContent: "center", alignItems: "center",
                                      background: "#BEF5C3", width: "40px", borderRadius: "3px"
                                    }}>
                                      <img
                                        src="dist/img/Timer.png"
                                        className="all_icon_imgs"
                                        alt="Timer"
                                      />
                                    </div>
                                  </div>
                                  <div className="">
                                    <div className="col-md-12">
                                      <div>
                                        <span className="nine_font_class" style={{ color: "#293043" }}>
                                          Analytics for last week
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{
                      height: "100%",
                      marginTop: "10PX",
                    }}
                  >
                    <div
                      className="small-box"
                      style={{
                        padding: "0px",
                        boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.2)",
                        borderRadius: "0px 0px 5px 5px",
                      }}
                    >
                      <div className="">
                        <div>
                          <div
                            style={{
                              background: "rgb(108, 122, 153)",
                              color: "#fff",
                              padding: "3px 7px 5px 25px",
                            }}
                          >
                            <span className="ten_font_class">Flagged Content</span>
                          </div>
                        </div>

                        <div className="event_inner_div" style={{ minHeight: "140px", paddingBottom: "10px" }}>
                          <div className="row m-0">
                            <div className="d-flex">
                              <DataTable
                                fixedHeader
                                fixedHeaderScrollHeight="800px"
                                columns={columns}
                                data={flaggedData}
                                customStyles={customStyles}
                              />
                            </div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <Link to="/FlaggedContents"
                              style={{
                                border: "none", color: "rgb(108, 122, 153)", padding: "6px 40px",
                                borderRadius: "5px", fontSize: "9px", fontWeight: "600"
                              }}
                            >View All</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}