import React from "react";

import { Link } from "react-router-dom";

import CommonLogo from "../common/CommonLogo";
import { CONTACT, PATHS } from "@/constants";

import { MdOutlineMail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const menus = [
  {
    heading: "Về HD Global Studies",
    menu: [
      {
        path: PATHS.ABOUT,
        name: "Giới thiệu",
      },
      {
        path: PATHS.GALLERY,
        name: "Thư viện",
      },
    ],
  },
  {
    heading: "Dịch vụ của HD Global Studies",
    menu: [
      {
        path: PATHS.SERVICE,
        name: "Dịch vụ tư vấn",
      },
      {
        path: PATHS.ADVANTAGE,
        name: "Tại sao chọn HD Global Studies",
      },
    ],
  },
];

function Footer() {
  return (
    <div className="mt-8 w-full border-t-1 border-gray-200 bg-white px-0 md:px-4">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between py-12 lg:flex-row lg:items-start">
        <div className="flex flex-col items-center space-y-2 lg:items-start">
          <h1 className="text-primary mb-4 text-2xl font-semibold">
            HD Global Studies
          </h1>
          <ul className="flex flex-col items-center space-y-2 lg:items-start">
            <li>
              <a
                href={CONTACT.AMERICAN_ADDRESS}
                target="blank"
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  fontWeight: 700,
                }}
                className="px-8 text-center md:px-0"
              >
                USA: 15751 Brookhurst St., Ste 134 Westminster, CA 92683.
              </a>
            </li>
            <li>
              <a
                href={CONTACT.VIETNAME_ADDRESS}
                target="blank"
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  fontWeight: 700,
                }}
                className="px-8 text-center md:px-0"
              >
                Việt Nam: 5C2 Nguyễn Đình Chiểu, P. Dakao, Q.1, Tp. HCM.
              </a>
            </li>
            <li>
              <a
                href={CONTACT.EMAIL}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <MdOutlineMail fontSize={"20px"} />
                nguyenlongdien@gmail.com
              </a>
            </li>
            <li>
              <a
                href={CONTACT.PHONE_1}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <FaPhoneAlt fontSize={"20px"} />+ 1 (702) 820-8711
              </a>
            </li>
            <li>
              <a
                href={CONTACT.PHONE_2}
                style={{ display: "flex", gap: "8px", alignItems: "center" }}
              >
                <FaPhoneAlt fontSize={"20px"} />
                +84 908064656
              </a>
            </li>
          </ul>
        </div>
        <div className="mt-8 flex flex-col items-center space-y-8 md:flex-row md:items-start md:space-y-0 md:space-x-24 lg:mt-0">
          {menus.map((box, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 md:items-start"
            >
              <h1 className="mb-4 text-xl font-semibold">{box.heading}</h1>
              {box.menu.map((item, index) => (
                <Link key={index} to={item.path}>
                  {item.name}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="w-full border-t-1 border-gray-200" />
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center space-y-4 py-8 md:justify-between lg:flex-row">
        <CommonLogo size="120px" />
        <div className="flex flex-col items-center justify-center gap-1 md:flex-row">
          <h2 className="flex-co flex font-semibold">
            Copyright © 2025 HD Nguyen.LLC.
          </h2>
          <h2 className="flex-co flex font-semibold">All rights reserved.</h2>
        </div>

        <Link
          to={CONTACT.FACEBOOK}
          target="blank"
          className="flex items-center gap-2 font-medium"
        >
          <FaFacebook color="blue" fontSize={"28px"} /> HD Nguyen.LLC
        </Link>
      </div>
    </div>
  );
}

export default Footer;
