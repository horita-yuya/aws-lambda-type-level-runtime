```typescript
type RonChildCase<
  HAND extends Hand,
  WINNING extends HAND[number],
  NAKI extends HAND[number][],
> = MahjongKun<HAND, WINNING, NAKI, "ron", "child">;

type Case1_1_2 = ExpectTrue<
  Equal<
    RonChildCase<
      [
        "o2",
        "o3",
        "o4",
        "I2",
        "I2",
        "I2",
        "C4",
        "C5",
        "C6",
        "I6",
        "I6",
        "I6",
        "o4",
        "o4",
      ],
      "o3",
      []
    >,
    "1300"
  >
>;
```

```shell
aws lambda invoke --function-name tlrt-sample --payload '{"t1": "o2", "t2": "o3", "t3": "o4", "t4": "I2", "t5": "I2", "t6": "I2", "t7": "C4", "t8": "C5", "t9": "C6", "t10": "I6", "t11": "I6", "t12": "I6", "t13": "o4", "t14": "o4", "winning": "o3", "style": "ron", "position": "child"}' --cli-binary-format raw-in-base64-out /tmp/res.json && cat /tmp/res.json
```

'{"t1": "o2", "t2": "o3", "t3": "o4", "t4": "I2", "t5": "I2", "t6": "I2", "t7": "C4", "t8": "C5", "t9": "C6", "t10": "I6", "t11": "I6", "t12": "I6", "t13": "o4", "t14": "o4", "winning": "o3", "style": "ron", "position": "child"}'