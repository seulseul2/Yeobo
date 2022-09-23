package com.jagi.yeobo.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.OAS_30)
//                .securityContexts(Arrays.asList(securityContext()))
//                .securitySchemes(Arrays.asList(apiKey()))
                .useDefaultResponseMessages(false)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.jagi.yeobo.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Yeobo Swagger")
                .description("Welcome Yeobo SwaggerConfig")
                .version("3.0")
                .build();
    }


//    // 인증 방식 설정
//    private SecurityContext securityContext() {
//        return SecurityContext.builder()
//                .securityReferences(defaultAuth())
//                .build();
//    }
//
//    private List<SecurityReference> defaultAuth(){
//        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
//        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
//        authorizationScopes[0] = authorizationScope;
//        return Arrays.asList(new SecurityReference("X-AUTH-TOKEN", authorizationScopes));
//    }
//
//    // 버튼 클릭 시 입력 값 설정
//    private ApiKey apiKey(){
//        return new ApiKey("X-AUTH-TOKEN", "JWT", "header");
//    }



}
