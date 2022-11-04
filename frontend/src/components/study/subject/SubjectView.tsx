/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { Link as ReactLink } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Link,
  Text
} from "@chakra-ui/react";
import { v4 } from "uuid";
import AliceCarousel from "react-alice-carousel";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getSubject } from "../../../api/study";
import { useAppSelector } from "../../../store/hooks";
import Subject from "./Subject";
import NoSubject from "./NoSubject";
import { SampleNextArrow, SamplePrevArrow } from "./Button";

export type ProblemProps = {
  problem_id: number;
  problem_name: string;
  problem_solved: boolean[];
};
export type UserProps = {
  user_id: number;
  user_name: string;
  problem_cnt: number;
};

export type SubjectProps = {
  problems: ProblemProps[];
  users: UserProps[];
  deadline: string[];
};

function SubjectkView() {
  const studyRole = useAppSelector(state => state.auth.information.studyRole);
  const [isProgress, setIsProgress] = useState(false);
  const [lastIdx, setLastIdx] = useState(0);
  const [subjectList, setSubjectList] = useState<SubjectProps[]>([]);

  const getSubjectApi = async () => {
    const {
      data: { inProgress, subjects }
    } = await getSubject();
    setIsProgress(inProgress);
    setSubjectList(subjects);
  };

  useEffect(() => {
    getSubjectApi();
  }, []);

  useEffect(() => {
    setLastIdx(subjectList.length + 1);
  }, [subjectList]);

  const settings: Settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: lastIdx,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  const items = [
    <div className="item" data-value="1">
      1
    </div>,
    <div className="item" data-value="2">
      2
    </div>,
    <div className="item" data-value="3">
      3
    </div>,
    <div className="item" data-value="4">
      4
    </div>,
    <div className="item" data-value="5">
      5
    </div>
  ];

  return (
    <Flex w="100%" h="100%" flexDir="column" p="0 35px" justifyContent="center">
      <AliceCarousel mouseTracking items={items} controlsStrategy="alternate" />
      {/* <Slider {...settings}>
        {subjectList.map(subject => {
          return (
            <Subject
              problems={subject.problems}
              users={subject.users}
              deadline={subject.deadline}
              key={v4()}
            />
          );
        })}
        {!isProgress && <NoSubject studyRole={studyRole} />}
      </Slider> */}
    </Flex>
  );
}

export default SubjectkView;
