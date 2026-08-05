"use client";

import { motion } from "framer-motion";
import type { AnimatedIconProps } from "./types";

const UserPlusIcon = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className = "",
}: AnimatedIconProps) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`cursor-pointer ${className}`}
      initial="idle"
      whileHover="hover"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      {/* User avatar */}
      <motion.g
        style={{ transformOrigin: "12px 10px" }}
        variants={{
          idle: { scale: 1, y: 0 },
          hover: { scale: 1.08, y: -1.5 },
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
        <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
      </motion.g>

      {/* Plus sign */}
      <motion.g
        style={{ transformOrigin: "19px 19px" }}
        variants={{
          idle: { scale: 1, rotate: 0 },
          hover: { scale: 1.2, rotate: 90 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </motion.g>
    </motion.svg>
  );
};

UserPlusIcon.displayName = "UserPlusIcon";
export default UserPlusIcon;