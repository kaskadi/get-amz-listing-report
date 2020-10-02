![](https://img.shields.io/github/package-json/v/kaskadi/get-amz-listing-report)
![](https://img.shields.io/badge/code--style-standard-blue)
![](https://img.shields.io/github/license/kaskadi/get-amz-listing-report?color=blue)

**GitHub Actions workflows status**

[![](https://img.shields.io/github/workflow/status/kaskadi/get-amz-listing-report/deploy?label=deployed&logo=Amazon%20AWS)](https://github.com/kaskadi/get-amz-listing-report/actions?query=workflow%3Adeploy)
[![](https://img.shields.io/github/workflow/status/kaskadi/get-amz-listing-report/build?label=build&logo=mocha)](https://github.com/kaskadi/get-amz-listing-report/actions?query=workflow%3Abuild)
[![](https://img.shields.io/github/workflow/status/kaskadi/get-amz-listing-report/syntax-check?label=syntax-check&logo=serverless)](https://github.com/kaskadi/get-amz-listing-report/actions?query=workflow%3Asyntax-check)

**CodeClimate**

[![](https://img.shields.io/codeclimate/maintainability/kaskadi/get-amz-listing-report?label=maintainability&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/get-amz-listing-report)
[![](https://img.shields.io/codeclimate/tech-debt/kaskadi/get-amz-listing-report?label=technical%20debt&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/get-amz-listing-report)
[![](https://img.shields.io/codeclimate/coverage/kaskadi/get-amz-listing-report?label=test%20coverage&logo=Code%20Climate)](https://codeclimate.com/github/kaskadi/get-amz-listing-report)

**LGTM**

[![](https://img.shields.io/lgtm/grade/javascript/github/kaskadi/get-amz-listing-report?label=code%20quality&logo=LGTM)](https://lgtm.com/projects/g/kaskadi/get-amz-listing-report/?mode=list&logo=LGTM)

<!-- You can add badges inside of this section if you'd like -->

****

<!-- automatically generated documentation will be placed in here -->
# Resources documentation

The following lambda functions are defined in this repository:
- [get-amz-listing-report](#get-amz-listing-report)

The following layers are defined in this repository:
- [get-amz-listing-report-layer](#get-amz-listing-report-layer)

## get-amz-listing-report <a name="get-amz-listing-report"></a>

|          Name          | Sources                        | Timeout |                 Handler                | Layers                                                                          | Destinations                                                                 |
| :--------------------: | :----------------------------- | :-----: | :------------------------------------: | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| get-amz-listing-report | <ul><li>event bridge</li></ul> |   900s  | [handler](./get-amz-listing-report.js) | <ul><li>[get-amz-listing-report-layer](#get-amz-listing-report-layer)</li></ul> | <ul><li>On success: stocks _(type: event bridge, defined via ARN)_</li></ul> |

See [configuration file](./serverless.yml) for more details.

## get-amz-listing-report-layer <a name="get-amz-listing-report-layer"></a>

### Description

Layer for get-amz-listing-report

### Dependencies

- `mws-client`, version: `^1.1.3` ([see on NPM](https://www.npmjs.com/package/mws-client))

See [configuration file](./serverless.yml) for more details.

# Stack tags

You can use any tags (and their respective values) visible below to find ressources related to this stack on AWS. See [here](https://docs.amazonaws.cn/en_us/AWSCloudFormation/latest/UserGuide/aws-properties-resource-tags.html) for more details.

| Tag          | Value                  |
| :----------- | :--------------------- |
| app          | kaskadi                |
| service      | get-amz-listing-report |
| logical-unit | stocks                 |
| type         | eventBridge            |
<!-- automatically generated documentation will be placed in here -->

<!-- You can customize this template as you'd like! -->
