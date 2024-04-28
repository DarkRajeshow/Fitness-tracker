import { Apple, WeightIcon } from "lucide-react";
import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  padding: 16px 18px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 600;
`;

const Flex = styled.div`
  display: flex;
  flex-direction:column;
  gap: 6px;
`;
const Details = styled.div`
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const FoodCard = ({ food }) => {
  return (
    <Card>
      <Name>{food?.foodName}</Name>
      <Flex>
        <Details className="text-sm">
          <WeightIcon className="h-4 w-4" />
          {food?.quantity} gm
        </Details>
        <Details className="text-sm">
          <Apple className="h-4 w-4 " />
          {food?.caloriesPerUnit} Calories / gram
        </Details>
      </Flex>
    </Card>
  );
};

export default FoodCard;
