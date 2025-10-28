package org.openapitools.model;

import java.net.URI;
import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonTypeName;
import org.springframework.lang.Nullable;
import org.openapitools.jackson.nullable.JsonNullable;
import java.time.OffsetDateTime;
import javax.validation.Valid;
import javax.validation.constraints.*;
import io.swagger.v3.oas.annotations.media.Schema;


import java.util.*;
import javax.annotation.Generated;

/**
 * RefreshToken200Response
 */

@JsonTypeName("refreshToken_200_response")
@Generated(value = "org.openapitools.codegen.languages.SpringCodegen", date = "2025-10-28T11:03:36.438763291+07:00[Asia/Ho_Chi_Minh]", comments = "Generator version: 7.16.0")
public class RefreshToken200Response {

  private @Nullable String token;

  private @Nullable Integer expiresIn;

  public RefreshToken200Response token(@Nullable String token) {
    this.token = token;
    return this;
  }

  /**
   * Get token
   * @return token
   */
  
  @Schema(name = "token", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("token")
  public @Nullable String getToken() {
    return token;
  }

  public void setToken(@Nullable String token) {
    this.token = token;
  }

  public RefreshToken200Response expiresIn(@Nullable Integer expiresIn) {
    this.expiresIn = expiresIn;
    return this;
  }

  /**
   * Get expiresIn
   * @return expiresIn
   */
  
  @Schema(name = "expiresIn", requiredMode = Schema.RequiredMode.NOT_REQUIRED)
  @JsonProperty("expiresIn")
  public @Nullable Integer getExpiresIn() {
    return expiresIn;
  }

  public void setExpiresIn(@Nullable Integer expiresIn) {
    this.expiresIn = expiresIn;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RefreshToken200Response refreshToken200Response = (RefreshToken200Response) o;
    return Objects.equals(this.token, refreshToken200Response.token) &&
        Objects.equals(this.expiresIn, refreshToken200Response.expiresIn);
  }

  @Override
  public int hashCode() {
    return Objects.hash(token, expiresIn);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RefreshToken200Response {\n");
    sb.append("    token: ").append(toIndentedString(token)).append("\n");
    sb.append("    expiresIn: ").append(toIndentedString(expiresIn)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}

