import React, { Component } from 'react';
import {Text, ScrollView, View, StyleSheet, Linking, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Policy = () => {

  const navigation = useNavigation();

  const backfunc = () => {
    navigation.goBack();
  }

      return (
        <View style={styles.containerWrapper}>
        <View style={{flexDirection:'row', marginVertical:20, marginHorizontal:18}}>
          <TouchableOpacity style={{marginRight:18}} onPress={backfunc}>
              <Image style={{width:24, height:24}} source={require('../../images/back.png')} />
          </TouchableOpacity>
          <Text style={{fontWeight:'bold', fontSize:18, color:'dimgrey'}}>Privacy Policy</Text>
        </View>
        <ScrollView style={styles.scroll}>


                              <Text h1>A. PRIVACY POLICY</Text>
                              <Text h4>The purpose of this Notice</Text>
                              <Text>This notice describes how we collect and use personal data about individuals, in accordance with the General Data Protection Regulation(GDPR).{'\n'}{'\n'}You should read the following carefully in order to understand our procedures regarding your personal data and how we treat it. </Text>
                              <Text h4>{'\n'}{'\n'}WHAT IS THE GDPR?</Text>
                              <Text>The General Data Protection Regulation (GDPR) aims to strengthen data protection for people within the European Union, replacing the EU privacy directive known as Directive 95/46/EC. This regulation came into force on 25 May 2018. For more information about the GDPR, please visit:
                                <Text style={{color: 'blue'}}
                                  onPress={() => Linking.openURL('https://ec.europa.eu/info/law/law-topic/data-pro-tection_en')}>
                                  https://ec.europa.eu/info/law/law-topic/data-pro-tection_en
                              </Text>
                              </Text>
                              <Text h4>{'\n'}{'\n'}ABOUT US</Text>
                             <Text>ComeTogether Private Company is registered in Greece and our registered office is located at Tompazi 32 Thessaloniki, 546 44, Greece. Our purpose is to connect individuals and businesses to easily organise, work at, sell products at, invest on, sponsor and attend events(matchmaking between all types of event stakeholders, or any subsetof them).{'\n'}{'\n'}For the purpose of the Data Protection Legislation and this notice, weare the "Data Controller", which means that we are responsible for deciding how we hold and use any personal data about you. We are required under the Data Protection Legislation to notify you of the information contained in this Privacy Notice.</Text>
                              <Text h4>{'\n'}{'\n'}WHAT DATA WE COLLECT</Text>

                            <Text style={styles.subTitle}>Information and content you provide.{'\n'}</Text>
                            <Text>In order to register to our services we require the provision of your fullname, email address, password, date of birth.{'\n'}{'\n'}Optionally, If you want to register your venue so it can be booked for events, we will collect additional personal data from you such as the venue name, venue type/capacity, basic info, social links, your website (if available), audiovisual material, full address (country, city, address, postal code) and the venue pricing, so that you will be able to start accepting business offers.{'\n'}{'\n'}If you wish to register yourself as a services provider we will require a description of the services, a short bio of yours, your gender, a social links, your website (if available), audiovisual material and your pricing,so that you will be able to start accepting business offers.{'\n'} {'\n'}If you link your Facebook or Google or Scatter account or accounts from other third party services to ComeTogether, we also get information from those accounts. The information we get from those services depends on your settings and their privacy policies, so please check what those are.</Text>

                            <Text style={styles.subTitle}>{'\n'}Information and content collected automatically{'\n'}</Text>
                            <Text>By using our website, certain information gets created and logged automatically. For example we collect your IP address and other information via using essential cookies. For more information about  what are cookies and our cookie policy click here.{'\n'}{'\n'}Also, we collect information about you when you subscribe to our newsletter and when you email us through the email address provided in our website.{'\n'}{'\n'}We will process this data on the basis of your consent in signing up to our newsletters.</Text>

<Text h4>{'\n'}WHAT WE DO</Text>
          <Text h4> We use the information that we collect as follows:{'\n'}● Specific Reason {'\n'}If you provide personal data for a certain purpose, we may use the personal data solely in connection with the purpose for which it was provided. For instance, if you contact us by e-mail, we will use the Personal Data you provide to answer your question or resolve your problem. {'\n'}●Fulfill the contract{'\n'}We use personal data of the services providers, venue holders, event organizers and attendees to connect them with each other, in order to fulfill the purpose of our contract with each of the aforementioned individuals.{'\n'}● Internal Business Purposes-Legitimate interests{'\n'}We may use your personal data for internal business purposes, including to help us improve the content and functionality of our services, to better understand our users, to improve the Services, to manage your account and provide you with customer service, and to generally manage our services and business.{'\n'} ● Marketing {'\n'}We may use your personal data for our marketing and advertising purposes. We do this in order to inform you about services or events webelieve might be of interest to you. You can always ''opt out'' by sending as an email to info@cometogether.network{'\n'}●Use of Interest-Based Data {'\n'}We use the information we have to make suggestions for you, such as events you may be interested in. To create personalized information that is unique and relevant to you, we use your connections, preferences, interests and activities based on the data we collect and learn from you.{'\n'}●Comply with legal obligation
          </Text>
            <Text h4>{'\n'}{'\n'} DATA STORAGE</Text>
          <Text >
            We use MongoDB atlas, a fully automated cloud service engineered and run by the same team that builds the database to store your details. In the process of working with MongoDBatlas one must choose a cloud provider to store their data. We use AmazonWebServices having selected a database located in  Frankfurt, Germany. MongoDBatlas handles automatically the rest as regards to configuring and managing our database. Consequently, your data are transferred to our database in Germany, and are accessed by MongoDBatlas and AmazonWebServices solely for the purpose of the aforementioned storage process. Of course, to fully understand how and with whom the lattertwo are going to use your personal data, you should check out their own Privacy Policies (MongoDBatlas, AmazonWebServices).
          </Text>
<Text h4> {'\n'}{'\n'} DO WE SHARE YOUR PERSONAL DATA</Text>
          <Text >
            We don't share your personal data with third parties without your explicit consent. We consider this information to be a vital part of our re-lationship with you.
          </Text>
            <Text h4> {'\n'}{'\n'} POTENTIAL TRANSFER OF BUSINESS</Text>
          <Text >
            As we continue to develop our business, we might sell or buy stores,subsidiaries or business units. In such transactions, customer informa-tion generally is one of the transferred business assets but remainssubject to the promises made in any pre-existing Privacy Policy, un-less, of course, if you consent otherwise. Also, in the unlikely eventthat ComeTogether P.C. or substantially all of its assets are acquired,your information will of course be one of the transferred assets.
          </Text>
            <Text h4> {'\n'}{'\n'} DATA RETENTION</Text>
          <Text > We keep your information only so long as we need it to fulfill the pur-poses described in this policy. This is also the case for anyone that weshare your information with and who carries out services on our be-half. When we no longer need to use your information and there is noneed for us to keep it to comply with our legal or regulatory obliga-tions, we’ll either remove it from our systems or depersonalize it so
that we can't identify you. In any case, we won’t keep your personaldata more than ten years.
          </Text>
<Text h4>{'\n'}{'\n'}YOUR RIGHTS</Text>
          <Text > It is important that any and all personal data we hold about you is ac-curate and current. Should any of your personal information change,please notify us of such changes immediately by contacting us.{'\n'}{'\n'}You have several individual rights in relation to your personal data thatwe collect. In particular, you have the right to:{'\n'}{'\n'}
●Request access to your personal data.{'\n'}●Request any inaccuracies in your personal information be corrected{'\n'}●Request erasure of your personal data.{'\n'}●You may ask to object or restrict the processing of your personal data where there is something about your particular circumstances which makes you want to object to processing even when we are relying on a legitimate interest for that processing. {'\n'}{'\n'}Additionally, where we collect your personal details for sending younewsletters, campaigns or updates related to our work, you have theright at any time to notify us that you no longer want to receive this in-formation. To withdraw you consent you can use the “Unsubscribe”link present at the bottom of every email communication we send oryou can contact us at info@cometogether.network.
{'\n'}{'\n'}
          </Text>
<Text h4>LINKS TO THIRD-PARTY WEBSITES</Text>
          <Text >
            This Privacy Policy applies only to the services provided by us. TheServices may contain links to other websites not operated or con-trolled by us (the "Third Party Sites"). The policies and procedures wedescribed here do not apply to the Third Party Sites. The links fromthe services do not imply that we endorse or have reviewed the Third
          </Text>
          <Text >Party Sites. We suggest contacting those sites directly for informationon their privacy policies.
          </Text>
<Text h4> {'\n'}{'\n'}USE OF SERVICES BY UNDERAGED PEOPLE</Text>
          <Text>
            Registration and use of our services is not allowed to individuals underthe age of 16, unless there is consent of the persons who have theirparental responsibility.
          </Text>
            <Text h4>{'\n'}{'\n'}PRIVACY POLICY UPDATES</Text>
          <Text >
            We may change this privacy policy from time to time. We will post anyprivacy policy changes on this page and, if the changes are signifi-cant, we will provide a more prominent notice by adding a notice onthe Services homepages, login screens, or by sending you an emailnotification. We will also keep prior versions of this Privacy Policy inan archive for your review. We encourage you to review our privacy policy whenever you use the Services to stay informed about our infor-mation practices and the ways you can help protect your privacy.
          </Text>
            <Text h4>{'\n'}{'\n'} CONTACT DETAILS</Text>
          <Text>
            If you have any questions concerns about how we have collected, pro-cessed and used your data please contact us by emailing at info@-cometogether.network
          </Text>
            <Text h4>{'\n'}{'\n'}COOKIE POLICY</Text>
          <Text>
            At ComeTogether, we respect your concerns about privacy and value the relationship that we have with you.{'\n'}{'\n'}Like many companies, we use technology on our website to collect in-formation that helps us enhance your experience and our services.The cookies that we use at ComeTogether allow our website to workand help us to understand what information and advertising is mostuseful to visitors.
          </Text>
          <Text>
            {'\n'}{'\n'}Please take a moment to familiarise yourself with our cookie practicesand let us know if you have any questions by sending us an e-mail at info@cometogether.network.
          </Text>
           <Text> {'\n'}{'\n'}Who is collecting it?</Text>
          <Text>{'\n'}Any personal data provided to or collected by ComeTogether via cook-ies and other tracking technologies is controlled by ComeTogether Pri-vate Company. By using our website, you are consenting to our use ofcookies in accordance with this Cookie Notice.
          </Text>
            <Text>{'\n'}{'\n'}What does cookie mean?</Text>
          <Text>{'\n'}Cookies, are files containing small amounts of information which aredownloaded to any internet enabled device – such as your computer,smartphone or tablet – when you visit a website.
          </Text>
            <Text>{'\n'}{'\n'}What purpose do we use cookies for?</Text>
          <Text>{'\n'}We use cookies to make ComeTogether website easier to use, to de-liver a personalised experience, and to better tailor our  services andwebsites to your interests and needs. Cookies are used to help speedup your future activities and your experience on ComeTogether web-site.
          </Text>
            <Text>{'\n'}{'\n'}What cookies do we use?</Text>
          <Text>{'\n'}Strictly necessary cookies-essential cookies{'\n'}These are cookies that are strictly necessary for a service requestedby the user and are exempt from the consent requirements.  Strictlynecessary cookies include cookies used for, security, page load andremembering previous actions when returning to previously visitedpages in the same session.
          </Text>
            <Text h4> {'\n'}{'\n'}DURATION OF THE COOKIES WE USE</Text>
          <Text>Session Cookies{'\n'}These cookies are temporary cookies that remain on your device until you log out of our website.
          </Text>
<Text h4>{'\n'}{'\n'}COOKIE POLICY UPDATES</Text>
          <Text>We may change this cookie policy from time to time. We will post anycookie policy changes on this page and, if the changes are significant,we will provide a more prominent notice by adding a notice on the Ser-vices homepages, login screens, or by sending you an email notifica-tion. We encourage you to review our cookie   policy whenever youuse the Services to stay informed about our information practices andthe ways you can help protect your privacy.
          </Text>
            <Text h4>{'\n'}{'\n'}ReCaptcha Privacy Policy</Text>
          <Text>We use Google's reCAPTCHA mechanism to verify that you are not arobot. This works by collecting your hardware and software informa-tion, such as device and application data and the results of integritychecks and sending them to Google for analysis. reCAPTCHA is sub-ject to the  Google Privacy Policy  and  Terms of Use. Using our ser-vices means the acceptance of our sharing your aforementioned per-sonal data with Google in connection with this purpose.
          </Text>

          </ScrollView>
        </View>
      );

}

export default Policy

const styles = StyleSheet.create({
  containerWrapper:{
    display: 'flex',
    backgroundColor:'#efeff5'
  },
  scroll : {
    backgroundColor:'white',
    marginHorizontal:18,
    marginVertical:20,
    borderRadius:10,
    paddingHorizontal:18,
    paddingVertical:18
  },
  logo: {
    marginBottom: 10,
    height: 40,
    width: 40,
    margin: 'auto',
    display: 'flex',
    marginTop: 10,
    justifyContent: "center"
  },
  btContainer: {
    overflow: 'hidden',
    top: 20
  },
  subTitle: {
    color: 'grey'
  }
});
