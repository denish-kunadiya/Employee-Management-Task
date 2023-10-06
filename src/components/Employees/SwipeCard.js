import React, { useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Divider, Stack } from "@mui/material";
const Wrapper = styled("div")({
  width: "100%",
  //   border: "1px solid red",
  overflow: "hidden",
});

const Item = ({ children }) => {
  const ref = useRef();
  let downX;

  const onPointerMove = (e) => {
    const newX = e.clientX;

    if (newX - downX > -1000) {
      ref.current.style.transform = "translate(-65px)";
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = "translate(0px)";
        }
      }, 2000);
    } else {
      ref.current.style.transform = "translate(0px)";
    }
  };

  const onPointerUp = (e) => {
    ref.current.removeEventListener("pointermove", onPointerMove);
  };
  const onPointerDown = (e) => {
    downX = e.clientX;
    ref.current.addEventListener("pointermove", onPointerMove);
  };

  return (
    <ItemWrapper
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      ref={ref}
    >
      {children}
    </ItemWrapper>
  );
};

const ItemWrapper = styled("div")({
  display: "flex",
  //   backgroundColor: "lightgray",
  transition: "transform 800ms",
  // cursor: "pointer",
});

const DeleteButton = styled("button")({
  backgroundColor: "red",
  //   textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  minWidth: "85px",
});

const SwipeCard = ({
  item,
  onDelete,
  setOpen,
  setFormValues,
  setSelectedUser,
  setEditUser,
  setSelectedFromDate,
  setSelectedToDate,
  selectedFromDate,
  selectedToDate,
}) => {
  return (
    <Box sx={{ padding: "0.5rem 1rem" }}>
      <>
        <Wrapper>
          <Stack sx={{ padding: "0rem 0 0 1rem" }}>
            <Item key={item.id + 3}>
              <div style={{ flex: "1 0 100%" }}>
                <span
                  style={{ margin: "0.2rem", cursor: "pointer" }}
                  onClick={() => {
                    setOpen(true);
                    setFormValues({
                      name: item.name,
                      role: item.role,
                    });
                    setSelectedFromDate(new Date(item.fromDate));
                    setSelectedToDate(new Date(item.toDate));
                    setSelectedUser(item);
                    setEditUser(true);
                  }}
                >
                  {item.name}
                </span>
                <br />
                <span style={{ fontSize: "0.8rem", color: "gray" }}>
                  {item.role}
                </span>
                <br />
                <span style={{ fontSize: "0.8rem", color: "gray" }}>
                  {item.fromDate}
                </span>
              </div>
              <DeleteButton>
                <DeleteIcon
                  sx={{ color: "#ffffff", cursor: "pointer" }}
                  onClick={() => onDelete(item.id)}
                />
              </DeleteButton>
            </Item>
          </Stack>
        </Wrapper>
        <Divider variant="middle" />
      </>
    </Box>
  );
};

export default SwipeCard;
