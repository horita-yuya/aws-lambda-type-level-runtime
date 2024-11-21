```shell
yarn build
yarn zip
yarn deploy
```

```shell
aws lambda invoke --function-name tlrt-sample --payload '{"t1": "o2", "t2": "o3", "t3": "o4", "t4": "I2", "t5": "I2", "t6": "I2", "t7": "C4", "t8": "C5", "t9": "C6", "t10": "I6", "t11": "I6", "t12": "I6", "t13": "o4", "t14": "o4", "winning": "o3", "style": "ron", "position": "child"}' --cli-binary-format raw-in-base64-out /tmp/res.json && cat /tmp/res.json
```