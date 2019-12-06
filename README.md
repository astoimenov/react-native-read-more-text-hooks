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
export class DescriptionCard extends React.Component {
  _renderTruncatedFooter = (handlePress) => {
    return (
      <RegularText style={{color: Colors.tintColor, marginTop: 5}} onPress={handlePress}>
        Read more
      </RegularText>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <RegularText style={{color: Colors.tintColor, marginTop: 5}} onPress={handlePress}>
        Show less
      </RegularText>
    );
  }

  _handleTextReady = () => {
    // ...
  }
  
  render() {
    let { text } = this.props;

    return (
      <View>
        <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelText}>
            Description
          </BoldText>
        </View>

        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={3}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}
              onReady={this._handleTextReady}>
              <RegularText style={styles.cardText}>
                {text}
              </RegularText>
            </ReadMore>
          </View>
        </View>
      </View>
    );
  }
}
```
