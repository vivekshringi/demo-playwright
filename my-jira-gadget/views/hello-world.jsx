import SectionMessage, { SectionMessageAction } from '@atlaskit/section-message';
import React from 'react';

export default function HelloWorld() {
  const [excitementLevel, setExcitementLevel] = React.useState(0);
  return <SectionMessage
      title={`Hello, world${excitementLevel ? new Array(excitementLevel).fill('!').join('') : '.'}`}
      actions={
        <>
          <SectionMessageAction key="1" href="https://atlassian.design/components/">
            Browse more components to add to your app
          </SectionMessageAction>
          <SectionMessageAction key="2" onClick={() => setExcitementLevel(excitementLevel + 1)}>
            Get excited!
          </SectionMessageAction>
        </>
      }
    >
      <p>
        Congratulations! You have successfully created an Atlassian Connect app using the <a href={'https://bitbucket.org/atlassian/atlassian-connect-express'}>atlassian-connect-express</a> client library.
      </p>
    </SectionMessage>;
}
