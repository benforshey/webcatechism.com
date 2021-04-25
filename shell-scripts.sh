#! /bin/bash
# for i in `seq 1 52`;
# do
#     curl -s "http://www.newcitycatechism.com/q-parent/q${i}.php" | xmllint --html --xpath '//div[@class="niv"]//p' >> scriptureNIV.html 2>/dev/null -
#     printf '\n\n' >> scriptureNIV.html
# done

# for i in `seq 1 52`;
# do
#     curl -s "http://www.newcitycatechism.com/q-parent/q${i}.php" | xmllint --html --xpath '//div[@class="esv"]//p' >> scriptureESV.html 2>/dev/null -
#     printf '\n\n' >> scriptureESV.html
# done

# for i in `seq 1 52`;
# do
#     curl -s "http://www.newcitycatechism.com/q-parent/q${i}.php" | xmllint --html --xpath '//span[@class="highlight"]' >> questionChild.html 2>/dev/null -
#     printf '\n\n' >> questionChild.html
# done

# for file in static/video/*;
# do
#     echo \"${file#*/}\", >> temp.txt
# done

# for i in `seq -f "%02g" 1 52`;
# do
#     mkdir audio/${i}
# done

for i in `seq -f "%02g" 1 52`;
do
    hugo new lesson/${i}.html
    sleep 1s
done
