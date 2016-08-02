FROM bstegmaier/brouter-app

ADD download_country.sh /download_country.sh
ADD download_profiles.sh /download_profiles.sh

RUN chmod +x /download_country.sh && \
 /download_country.sh Germany \
 /download_country.sh France \
 /download_country.sh Portugal \
 /download_country.sh Spain

RUN chmod +x /download_profiles.sh && /download_profiles.sh

EXPOSE 17777