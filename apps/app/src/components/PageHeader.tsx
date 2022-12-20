import { FlexBox, H3, IconWrapper, Span } from "@cd/shared-ui";
import React from "react";
import {SideNav} from ".";

export interface PageHeaderProps {
  title?: string;
  subTitle?: string;
  navigation?: any;
  Button?: any;
  Icon?: any;
}
export default function PageHeader ({
  title,
  subTitle,
  navigation,
  Button,
  Icon
}: PageHeaderProps ) {
  return (
    <div>
      <FlexBox className="my-2 flex grow justify-between">
        <FlexBox className="flex-col">
          <FlexBox className="flex-row items-center">
            <H3>{ title }</H3>
            { Icon && <IconWrapper className="items-center" Icon={ Icon } size={ 24 } /> }
          </FlexBox>
          { subTitle && (
            <Span className="text-primary">
              { subTitle }
            </Span>
          )}
        </FlexBox>
        {/* <SideNav position="left" handle={<Menu fontSize="small" />}>
          {navigation}
        </SideNav> */}
        {/* desktop position */}
        {Button && <div className="md:mt-2">{ Button }</div>}
      </FlexBox>
      {/* mobile position */}
      { Button && <div className="md:mt-2">{ Button }</div>}
    </div>
  );
};
