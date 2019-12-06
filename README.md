# react-native-read-more-text-hooks
React Native component to add a 'Read More' and optionally a 'Read Less' button to text that exceeds a given number of lines. Written with React Hooks ;)

### Installation

```
npm i react-native-read-more-text-hooks --save
```

or

```
yarn add react-native-read-more-text-hooks
```

### Usage

```javascript
import React from "react";
import { Text, View } from "react-native";
import ReadMore from "react-native-read-more-text-hooks";

const _renderTruncatedFooter = (handlePress: () => void) => {
  return (
    <Text style={{ marginTop: 5 }} onPress={handlePress}>
      Read more
    </Text>
  );
};

const _renderRevealedFooter = (handlePress: () => void) => {
  return (
    <Text style={{ marginTop: 5 }} onPress={handlePress}>
      Show less
    </Text>
  );
};

const _handleTextReady = () => {
  // ...
};

const DescriptionCard = ({ text }: { text: string }) => (
  <View>
    <Text>Description</Text>

    <ReadMore
      numberOfLines={3}
      renderTruncatedFooter={_renderTruncatedFooter}
      renderRevealedFooter={_renderRevealedFooter}
      onReady={_handleTextReady}
    >
      <Text>{text}</Text>
    </ReadMore>
  </View>
);

export default DescriptionCard;
```
